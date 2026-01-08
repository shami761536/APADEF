
import React from 'react';
import { PROGRAMS } from '../constants';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Programs = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-900 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Comprehensive initiatives designed to create lasting change and empower communities across Central Africa.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Transforming Lives Through Action</h2>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            APDFE operates across Central African Republic, Democratic Republic of Congo (Eastern DRC), Congo-Brazzaville, and Cameroon with core program areas addressing the most critical needs in our communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROGRAMS.map((program) => (
            <div key={program.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col group">
              <div className="h-64 relative overflow-hidden">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{program.title}</h3>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {program.description}
                </p>
                <div className="space-y-3 mb-8">
                  {program.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <button className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact summary section */}
      <section className="bg-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">50,000+</div>
              <div className="text-xs uppercase tracking-widest text-blue-300 font-bold">Lives Impacted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">4</div>
              <div className="text-xs uppercase tracking-widest text-blue-300 font-bold">Countries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">65%</div>
              <div className="text-xs uppercase tracking-widest text-blue-300 font-bold">Women Reached</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">120+</div>
              <div className="text-xs uppercase tracking-widest text-blue-300 font-bold">Communities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
