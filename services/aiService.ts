'use server';

const BOT_TOKEN = '8162964724:AAGFqoLbr-g43IynIwQe6ll5CsCoYchMGlY';
const ADMIN_CHAT_ID = '7110225250';

export async function sendMessageToAgent(text: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  // Format timestamp for Bangladesh Time (Asia/Dhaka) for the Admin's view in Telegram
  const bangladeshTime = new Date().toLocaleString('en-US', { 
    timeZone: 'Asia/Dhaka',
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true,
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  const messageText = `🔔 *New Web Chat Message*\n\n"${text}"\n\n🇧🇩 Time (BD): ${bangladeshTime}`;

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
        // Convert Unix timestamp (seconds) to ISO string
        // The client (browser) will convert this ISO string to the user's local time
        const date = new Date(update.message.date * 1000);
        
        if (update.message.text) {
          agentMessages.push({
            text: update.message.text,
            timestamp: date.toISOString()
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