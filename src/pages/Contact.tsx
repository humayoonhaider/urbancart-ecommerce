import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Info,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Incomplete Form', 'Please complete all required fields.', 'warning');
      return;
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      sentAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('urbancart_contact_messages') || '[]');
      localStorage.setItem('urbancart_contact_messages', JSON.stringify([newMessage, ...existing]));
    } catch {}

    setIsSubmitted(true);
    showToast('Demo Message Logged', 'Your simulated message was recorded in localStorage.', 'success');
  };

  const faqs = [
    {
      q: 'Is UrbanCart a real store?',
      a: 'No. UrbanCart is a fictional portfolio concept project created by SH Web Studio to demonstrate modern frontend engineering, product filtering, responsive UI, real-time analytics, and checkout simulation.'
    },
    {
      q: 'Will my credit card be charged?',
      a: 'Never. No real payments are processed and no payment gateway credentials are required. The checkout simulates card authorizations and cash on delivery safely in your browser.'
    },
    {
      q: 'How does data persistence work?',
      a: 'All cart items, saved wishlist products, recent searches, completed demo orders, and profile addresses persist seamlessly using browser HTML5 localStorage.'
    },
    {
      q: 'How can I deploy this project to Vercel?',
      a: 'The project is 100% frontend React + Vite without any backend server. Simply link your GitHub repository to Vercel and run `npm run build`.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white font-heading tracking-tight">
          Contact &amp; Support
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Have questions about the UrbanCart concept, UX architecture, or looking to collaborate on web projects?
        </p>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left 7 Cols: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
              Send a Demo Message
            </h2>
          </div>

          <p className="text-xs text-neutral-500 mb-6">
            Fill out the form below. Messages are saved to your browser session storage.
          </p>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 font-heading">
                Message Received!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm">
                Thank you for testing the contact form. Your message was successfully recorded in local demo storage.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Send Another Demo Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Humayoon Khan"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Inquiry regarding SH Web Studio projects"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-500 text-[11px]">
                <Info className="w-4 h-4 shrink-0 text-neutral-400 mt-0.5" />
                <span>
                  This is a demo contact form and does not send messages to a real email inbox.
                </span>
              </div>

              <button
                type="submit"
                className="py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right 5 Cols: Demo Details & Hours */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col gap-6">
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-800">
              Demo Studio Coordinates
            </h3>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Demo Email</span>
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">hello@urbancart.demo</div>
                <span className="text-xs text-neutral-500">Fast simulated replies</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Location</span>
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">Pakistan — Demo Project</div>
                <span className="text-xs text-neutral-500">Created by SH Web Studio</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Studio Hours</span>
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">Mon – Fri: 9:00 AM – 6:00 PM PKT</div>
                <span className="text-xs text-neutral-500">24/7 Digital Catalog Availability</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-3xl p-6">
            <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 font-heading mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>SH Web Studio Portfolio</span>
            </h4>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed mt-1">
              UrbanCart is ready for client proposals, freelance demonstration, and instant production build deployments.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl mx-auto w-full">
        <h3 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h3>

        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-neutral-900 dark:text-white font-heading cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : 'text-neutral-400'}`} />
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
