
import React from 'react';
import { Shield, Heart, Users, CheckCircle, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { TEAM_MEMBERS, TIMELINE_EVENTS } from '../constants';

export const About = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="bg-blue-900 py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">A.P.D.F.E</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed uppercase tracking-widest text-sm opacity-80">
            Action Pour le Développement de la Femme et de l'Enfant
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800/20 -skew-x-12 transform translate-x-20"></div>
      </section>

      {/* Who We Are */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Our Identity</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Survivor-Led & Community Driven</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                Action Pour le Développement de la Femme et de l'Enfant (APDFE) is a survivor-led, women- and child-centered humanitarian organization founded in 2019 by two human rights defenders who transformed their personal experiences of violence and loss into a powerful force for collective healing and systemic change.
              </p>
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl border-l-8 border-blue-600 relative overflow-hidden group">
                <p className="relative z-10 font-bold italic text-lg leading-relaxed">
                  "We are not just an organization that works for vulnerable populations—we ARE those populations. Our staff, leadership, and community mobilizers are survivors."
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full group-hover:scale-110 transition-transform"></div>
              </div>
              <p>
                Operating in four of Central Africa's most fragile and conflict-affected countries—Central African Republic, Democratic Republic of Congo, Republic of Congo, and Cameroon—we deliver trauma-informed, locally-led interventions.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[600px] relative z-10">
               <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop" alt="Empowerment" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-green-500 rounded-[2rem] -z-10 animate-pulse"></div>
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-600 rounded-full -z-10 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Contact & About Summary Page Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Direct Access</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contact Information</h2>
            <p className="text-slate-500 font-medium">Reach out directly to our regional headquarters for mission inquiries, partnerships, or support.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Dispatch</h4>
                  <a href="mailto:info@apdfe.org" className="text-lg font-black text-slate-900 hover:text-blue-600 transition-colors">info@apdfe.org</a>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Field Phone</h4>
                  <a href="tel:+250788123456" className="text-lg font-black text-slate-900 hover:text-green-600 transition-colors">+250 788 123 456</a>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-all col-span-1 sm:col-span-2">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center flex-shrink-0 text-2xl font-black">
                    A
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registered Entity</h4>
                    <p className="text-xl font-black text-slate-900">A.P.D.F.E L_</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Action Pour le Développement de la Femme et de l'Enfant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col justify-center text-center">
             <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20">
               <Globe size={40} />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-6">Our Operations</h3>
             <p className="text-slate-500 leading-relaxed font-medium mb-10">
               We maintain an active presence across multiple Central African borders. Our "L_" designation signifies our commitment to Leadership, Legacy, and Life.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                {['DRC', 'CAR', 'Rwanda', 'Cameroon'].map(country => (
                  <span key={country} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{country}</span>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Strategic Core</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Users size={32} />, title: "Survivor-Centered", desc: "Our programs are designed BY survivors, FOR survivors." },
            { icon: <Heart size={32} />, title: "Dignity & Respect", desc: "We restore hope, autonomy, and self-worth to those society has marginalized." },
            { icon: <Shield size={32} />, title: "Community-Led", desc: "We empower local leaders and support grassroots solutions." },
            { icon: <CheckCircle size={32} />, title: "Do No Harm", desc: "Safety, confidentiality, and trauma-informed care are at the heart of our work." }
          ].map((v, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="text-blue-600 flex justify-center mb-8 group-hover:scale-110 transition-transform">{v.icon}</div>
              <h3 className="text-xl font-black mb-4 text-slate-900">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-900 text-white p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-3xl font-black mb-8 relative z-10">Our Mission</h3>
            <p className="text-slate-300 text-xl leading-relaxed italic font-medium relative z-10">
              "To empower, protect, and advocate for vulnerable women and children living in conflict and post-conflict environments across Central Africa by providing holistic, trauma-informed services."
            </p>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
          </div>
          <div className="bg-blue-600 text-white p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-3xl font-black mb-8 relative z-10">Our Vision</h3>
            <p className="text-blue-50 text-xl leading-relaxed italic font-medium relative z-10">
              "A Central Africa where every woman and child—regardless of conflict or poverty—lives with dignity, safety, and the full realization of their rights."
            </p>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          </div>
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Operational History</h2>
            <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">A Legacy of Survival and Growth</p>
          </div>
          <div className="relative border-l-4 border-blue-50 ml-4 md:ml-auto md:mr-auto space-y-20 max-w-4xl mx-auto">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={event.year} className="relative pl-12">
                <div className="absolute left-[-11px] top-0 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="animate-in slide-in-from-bottom-8 duration-700">
                  <span className="text-5xl font-black text-blue-600/10 mb-2 block leading-none">{event.year}</span>
                  <div className="-mt-8">
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{event.title}</h4>
                    <p className="text-slate-600 mb-6 font-medium leading-relaxed">{event.description}</p>
                    {event.quote && (
                      <div className="bg-slate-50 p-6 border-l-4 border-green-500 rounded-2xl text-sm italic text-slate-500 font-bold shadow-sm">
                        "{event.quote}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
