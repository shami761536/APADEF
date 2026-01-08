
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles } from 'lucide-react';

export const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-900 py-24 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Reach out to our regional coordination team for mission support, strategic partnerships, or urgent inquiries.
          </p>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight leading-none">Regional Headquarters</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-1 text-lg">Office Address</h4>
                  <p className="text-slate-500 font-bold leading-relaxed uppercase tracking-tighter text-sm">Kigali, Rwanda<br />KG 123 Street, Near KBC</p>
                </div>
              </div>

              <div className="flex gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-1 text-lg">Email Dispatch</h4>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm">info@apdfe.org<br />support@apdfe.org</p>
                </div>
              </div>

              <div className="flex gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-1 text-lg">Field Phone</h4>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm">+250 788 123 456<br />+250 788 987 654</p>
                </div>
              </div>

              <div className="flex gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-1 text-lg">Operational Hours</h4>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-tighter">Mon – Fri: 08:00 – 17:00 (CAT)<br />Sat: 09:00 – 13:00 (CAT)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
            {isSent ? (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Secure Dispatch Successful</h3>
                  <p className="text-slate-500 font-medium max-w-sm">Your message has been routed to the appropriate regional coordinator. Expect a response within 24 operational hours.</p>
                  <button onClick={() => setIsSent(false)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl">Send Another Inquiry</button>
               </div>
            ) : (
              <>
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Secure Messaging</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Full Name</label>
                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-bold" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Secure Email</label>
                    <input required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-bold" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Subject Category</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none font-bold text-slate-700" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                      <option>General Inquiry</option>
                      <option>Partnership Proposal</option>
                      <option>Volunteer Question</option>
                      <option>Support Request</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Inquiry Details</label>
                    <textarea required rows={5} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium" placeholder="How can we assist you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3">
                    Deploy Message <Send size={18} />
                  </button>
                </form>
              </>
            )}
            <div className="absolute top-0 right-0 p-8 text-blue-100 pointer-events-none">
              <Sparkles size={64} className="opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-slate-200 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-40" alt="Map background" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
           <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-sm text-center animate-in slide-in-from-bottom-8 duration-1000">
             <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
               <MapPin size={32} />
             </div>
             <h4 className="text-2xl font-black text-slate-900 mb-2">Main Regional Hub</h4>
             <p className="text-sm text-slate-500 font-medium">Visit us at our central coordination office in Kigali to discuss mission growth.</p>
           </div>
        </div>
      </section>
    </div>
  );
};
