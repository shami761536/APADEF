
import React, { useState } from 'react';
import { Mail, Heart, HandHelping, Globe, Share2, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const GetInvolved = () => {
  const { addVolunteer } = useData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interests: [] as string[],
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const volunteer = {
      id: `v-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: 'Global',
      interests: formData.interests
    };
    addVolunteer(volunteer);
    setIsSubmitted(true);
    setFormData({ firstName: '', lastName: '', email: '', interests: [], message: '' });
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero */}
      <section className="bg-blue-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">Join Our Global Community</h1>
            <p className="text-xl text-blue-100 font-light leading-relaxed">
              When you get involved with A.P.D.F.E, you become part of a passionate community of changemakers. Your involvement creates ripples of positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Help Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Choose Your Way to Help</h2>
          <p className="mt-4 text-slate-500 font-medium">Whatever your skills or resources, you can make a difference.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <HandHelping className="text-blue-600" size={32} />, title: "Volunteer Your Time", desc: "Share your skills and passion by volunteering locally or internationally.", points: ["On-site volunteering", "Remote opportunities", "Professional skill-sharing"] },
            { icon: <Heart className="text-red-600" size={32} />, title: "Make a Donation", desc: "Your financial support helps us expand our programs and reach more people.", points: ["One-time donations", "Monthly giving", "Corporate matching"] },
            { icon: <Globe className="text-green-600" size={32} />, title: "Become a Partner", desc: "Organizations can partner with us to create sustainable regional impact.", points: ["Corporate sponsorships", "Employee engagement", "In-kind donations"] },
            { icon: <Share2 className="text-sky-600" size={32} />, title: "Spread the Word", desc: "Help us reach more people by sharing our mission on social media.", points: ["Follow us", "Host awareness events", "Advocacy campaigns"] },
            { icon: <Calendar className="text-amber-600" size={32} />, title: "Attend Our Events", desc: "Join us at fundraising events and community gatherings throughout the year.", points: ["Fundraising galas", "Workshops", "Community walks"] },
            { icon: <Mail className="text-slate-600" size={32} />, title: "Stay Informed", desc: "Sign up for our newsletter to get updates on our latest projects.", points: ["Quarterly reports", "Success stories", "Urgent calls"] }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">{item.desc}</p>
              <ul className="space-y-3">
                {item.points.map((p, pIdx) => (
                  <li key={pIdx} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div id="volunteer-form" className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 bg-slate-900 text-white relative overflow-hidden">
              <h3 className="text-4xl font-black mb-8 relative z-10 tracking-tight">Volunteer Application</h3>
              <p className="text-slate-400 mb-12 relative z-10 font-medium">Fill out the form below and our team will get back to you within 48 hours to discuss matching your skills with our needs.</p>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                  <div className="p-3 bg-white/10 rounded-xl"><Heart size={20} className="text-green-500" /></div>
                  <div>
                    <h4 className="font-bold">Skills Needed</h4>
                    <p className="text-sm text-slate-400">Medical, teaching, logistics, IT, and more.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-white/10 rounded-xl"><Globe size={20} className="text-blue-500" /></div>
                  <div>
                    <h4 className="font-bold">Global Impact</h4>
                    <p className="text-sm text-slate-400">Join a network of over 500 volunteers.</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="p-12 lg:p-20 relative">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                   <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle size={48} />
                   </div>
                   <h3 className="text-3xl font-black text-slate-900">Application Received</h3>
                   <p className="text-slate-500 font-medium max-w-sm">Thank you for your willingness to serve. A regional coordinator will review your profile and contact you soon.</p>
                   <button onClick={() => setIsSubmitted(false)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Apply Again</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest">First Name *</label>
                      <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-bold" placeholder="John" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest">Last Name *</label>
                      <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-bold" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest">Email Address *</label>
                    <input required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-bold" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest">Areas of Interest</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Education', 'Health', 'Development', 'Environment'].map((area) => (
                        <button 
                          key={area} 
                          type="button" 
                          onClick={() => toggleInterest(area)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-bold text-sm ${formData.interests.includes(area) ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                        >
                          <CheckCircle size={16} className={formData.interests.includes(area) ? 'opacity-100' : 'opacity-0'} /> {area}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest">Tell us about yourself</label>
                    <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium" placeholder="Share your motivation..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    <Sparkles size={20} /> Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
