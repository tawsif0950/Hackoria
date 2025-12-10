'use server';

const BOT_TOKEN = '8162964724:AAGFqoLbr-g43IynIwQe6ll5CsCoYchMGlY';
const ADMIN_CHAT_ID = '7110225250';

export async function sendMessageToAgent(text: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const messageText = `🔔 *New Web Chat Message*\n\n"${text}"\n\n🕒 Time: ${timestamp}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown'
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Telegram Send Error:', error);
    return false;
  }
}

export async function checkAgentReplies(offset: number) {
  // getUpdates with offset to only get new messages. 
  // Cache: 'no-store' is crucial for Next.js to actually fetch fresh data.
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=0`;
  
  try {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    
    if (!data.ok || !data.result) {
      return { messages: [], nextOffset: offset };
    }

    const updates = data.result;
    const agentMessages: { text: string; timestamp: string }[] = [];
    let maxUpdateId = offset - 1;

    for (const update of updates) {
      // Track the highest update_id to confirm receipt
      maxUpdateId = Math.max(maxUpdateId, update.update_id);
      
      // Check if message is from the admin (You)
      if (update.message && update.message.from && update.message.from.id.toString() === ADMIN_CHAT_ID) {
        // Format timestamp from unix
        const date = new Date(update.message.date * 1000);
        const timeStr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        
        if (update.message.text) {
          agentMessages.push({
            text: update.message.text,
            timestamp: timeStr
          });
        }
      }
    }

    // Return messages and the next offset (max + 1) to mark these as read in Telegram
    return { messages: agentMessages, nextOffset: maxUpdateId + 1 };
    
  } catch (error) {
    console.error('Telegram Poll Error:', error);
    return { messages: [], nextOffset: offset };
  }
}