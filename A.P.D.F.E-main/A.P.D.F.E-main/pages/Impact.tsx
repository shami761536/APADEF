
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { IMPACT_DATA, TIMELINE_EVENTS } from '../constants';
import { TrendingUp, MapPin, Users, Heart } from 'lucide-react';

export const Impact = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const stats = [
    { label: "Beneficiaries", value: "68,000+", icon: <Users /> },
    { label: "Countries", value: "4", icon: <MapPin /> },
    { label: "Communities", value: "142", icon: <TrendingUp /> },
    { label: "% Survivor-Led", value: "100%", icon: <Heart /> },
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Our Impact — 2019 to Today</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            Track how APDFE has grown from a small survivor-led initiative to a regional movement.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4">{stat.icon}</div>
              <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Charts */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold mb-8 text-slate-900">Beneficiary Growth</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={IMPACT_DATA}>
                <defs>
                  <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003399" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#003399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="beneficiaries" stroke="#003399" strokeWidth={3} fillOpacity={1} fill="url(#colorBen)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold mb-8 text-slate-900">Community Outreach</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IMPACT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="communities" fill="#00AA44" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Progress Cards */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE_EVENTS.map((event) => (
            <div 
              key={event.year} 
              className={`bg-white p-8 rounded-2xl shadow-sm border transition-all cursor-pointer group ${selectedYear === event.year ? 'border-blue-500 ring-2 ring-blue-50' : 'border-slate-100'}`}
              onClick={() => setSelectedYear(event.year)}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-black text-slate-200 group-hover:text-blue-500 transition-colors">{event.year}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">Milestone</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{event.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-20 text-white text-center rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Support Our Next Phase</h2>
          <p className="text-lg text-blue-100 mb-10 font-light italic">
            "Help us scale survivor leadership, trauma healing centers, and scholarships to reach 100,000 beneficiaries by the end of 2025."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:bg-slate-50 transition-colors">
              Donate Now
            </button>
            <button className="bg-blue-700 text-white px-10 py-4 rounded-full font-bold shadow-xl border border-blue-500/50 hover:bg-blue-800 transition-colors">
              Our Vision
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
