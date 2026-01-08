
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, ShieldCheck, Heart, Mail, CheckCircle } from 'lucide-react';

export const Donate = () => {
  const [amount, setAmount] = useState('100');
  const [isMonthly, setIsMonthly] = useState(false);

  const amounts = ['25', '50', '100', '250', '500', '1000'];

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <section className="bg-green-600 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto font-light leading-relaxed">
            Your generosity transforms lives. Every donation brings hope, education, and opportunity to those who need it most.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Donation Form */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl p-10 md:p-14 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">Donation Details</h2>
            
            <div className="space-y-12">
              {/* Amount Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">Select Amount</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {amounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-4 rounded-xl font-black text-lg transition-all border-2 ${amount === val ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-900 hover:border-blue-200'}`}
                    >
                      ${val}
                    </button>
                  ))}
                  <div className="relative col-span-2 sm:col-span-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" 
                      placeholder="Custom" 
                      className="w-full pl-8 pr-4 py-4 bg-white border-2 border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Type Selection */}
              <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-80">
                <button 
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all ${!isMonthly ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  One Time
                </button>
                <button 
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all ${isMonthly ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Monthly
                </button>
              </div>

              {/* Personal Info */}
              <div className="space-y-6">
                 <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Personal Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-slate-400">First Name</label>
                       <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-slate-400">Last Name</label>
                       <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                 </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={20} /> },
                    { id: 'mobile', name: 'Mobile Money', icon: <Smartphone size={20} /> },
                    { id: 'bank', name: 'Bank Transfer', icon: <Building size={20} /> },
                    { id: 'crypto', name: 'Cryptocurrency', icon: <ShieldCheck size={20} /> },
                  ].map((m) => (
                    <label key={m.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="radio" name="payment" className="w-5 h-5 text-blue-600" />
                      <div className="text-slate-500">{m.icon}</div>
                      <span className="text-sm font-bold text-slate-700">{m.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                Complete Donation of ${amount}
              </button>

              <div className="flex justify-center items-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500" /> Secure Payment</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Tax Deductible</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Impact Highlights */}
            <div className="bg-slate-900 text-white p-10 rounded-[2rem] shadow-xl">
               <div className="flex items-center gap-3 mb-8">
                 <Heart className="text-red-500" fill="currentColor" size={24} />
                 <h3 className="text-xl font-bold tracking-tight">Your Impact</h3>
               </div>
               <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="text-2xl font-black text-blue-400">$25</div>
                    <p className="text-slate-400 text-sm">Provides school supplies for 5 children in Bangui.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-2xl font-black text-blue-400">$100</div>
                    <p className="text-slate-400 text-sm">Supports a month of after-school safe-space programs.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-2xl font-black text-blue-400">$250</div>
                    <p className="text-slate-400 text-sm">Provides medical care for 20 survivors of conflict.</p>
                  </div>
               </div>
            </div>

            {/* Recent Progress */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
               <h3 className="text-lg font-bold text-slate-900 mb-8">Recent Impact</h3>
               <div className="space-y-6">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">This Month</div>
                    <div className="text-2xl font-black text-green-600">$45,230</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Total Donors</div>
                    <div className="text-2xl font-black text-slate-900">1,247</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Lives Changed</div>
                    <div className="text-2xl font-black text-blue-600">5,000+</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
