import React from 'react';
import { MessageSquare, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-brand-dark border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to <span className="text-brand-primary">Secure</span> Your Future?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Whether you need a cutting-edge website or a comprehensive security audit, HACKORIA is your trusted partner. Reach out today.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-brand-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp / Phone</p>
                  <p className="text-white font-medium">+880 1410 199 221</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-brand-secondary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white font-medium">info@hackoria.space</p>
                </div>
              </div>

               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-brand-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Headquarters</p>
                  <p className="text-white font-medium">Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center">
            <div className="mb-6 p-4 bg-brand-primary/20 rounded-full animate-pulse">
              <MessageSquare size={48} className="text-brand-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Chat on WhatsApp</h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Connect directly with our team for the fastest response time. We are available 24/7 for emergency security consultations.
            </p>
            <a
              href="https://wa.me/8801410199221"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Open WhatsApp Chat
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;