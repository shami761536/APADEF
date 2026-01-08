
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Image as ImageIcon, Briefcase, ChevronRight, Clock, MapPin, Users, FileText, CheckCircle, Search, Filter, Sparkles } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const Publication = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { news, projects, gallery } = useData();

  const filteredNews = news.filter(n => 
    (filter === 'all' || filter === 'news') && 
    (n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredProjects = projects.filter(p => 
    (filter === 'all' || filter === 'projects') && 
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.region.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGallery = gallery.filter(g => 
    (filter === 'all' || filter === 'images') && 
    (g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} className="text-blue-400" /> Official APDFE Press & Reports
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Intelligence Hub</h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            Direct field insights, operational reports, and community stories from across Central Africa.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[72px] md:top-[112px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {[
                { id: 'all', label: 'All Content' },
                { id: 'news', label: 'Field News' },
                { id: 'projects', label: 'Regional Projects' },
                { id: 'images', label: 'Visual Media' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`text-xs font-black uppercase tracking-widest transition-all pb-2 -mb-2 border-b-2 whitespace-nowrap ${
                    filter === f.id ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search publications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* News Section */}
        {filteredNews.length > 0 && (
          <section id="news" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-end justify-between mb-12 border-l-4 border-blue-600 pl-6">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Public Record</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Field News & Updates</h2>
              </div>
              <div className="hidden md:block text-slate-400 text-xs font-bold uppercase tracking-widest">
                {filteredNews.length} Stories Found
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100 relative">
                  <div className="h-64 relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{item.category}</span>
                    </div>
                  </div>
                  <div className="p-10 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-tighter">
                      <Calendar size={14} className="text-blue-500" /> {item.date}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{item.excerpt}</p>
                    <button className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all group-hover:text-blue-600">
                      Read Full Story <ArrowRight size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {filteredProjects.length > 0 && (
          <section id="projects" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-end justify-between mb-12 border-l-4 border-amber-500 pl-6">
              <div>
                <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-2">Operational Oversight</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ongoing Regional Projects</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-8 p-10 md:p-14 space-y-8">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                          {project.status === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />} {project.status}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                          <MapPin size={14} className="text-blue-500" /> {project.region}
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{project.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg max-w-3xl">{project.description}</p>
                    </div>
                    <div className="lg:col-span-4 bg-slate-50 p-10 md:p-14 flex flex-col justify-center items-center text-center space-y-10 border-l border-slate-100">
                      <div className="w-full">
                        <div className="flex justify-between items-end mb-4">
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Deployment Readiness</div>
                          <div className="text-5xl font-black text-blue-600">{project.progress}%</div>
                        </div>
                        <div className="h-6 w-full bg-slate-200 rounded-full overflow-hidden p-1.5 shadow-inner">
                          <div style={{ width: `${project.progress}%` }} className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${project.progress === 100 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`} />
                        </div>
                      </div>
                      <div className="w-full">
                        <Link to={`/project-report/${project.id}`} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl">
                          <FileText size={20} /> Access Full Report
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {filteredGallery.length > 0 && (
          <section id="gallery" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-end justify-between mb-12 border-l-4 border-purple-600 pl-6">
              <div>
                <span className="text-xs font-black text-purple-600 uppercase tracking-widest block mb-2">Visual Testimony</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Media Gallery</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredGallery.map((img) => (
                <div key={img.id} className="group relative h-80 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-slate-100">
                  <img src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md mb-3">Field Shot</span>
                    <h4 className="text-xl font-bold text-white leading-tight mb-2">{img.title}</h4>
                    <p className="text-slate-300 text-xs font-medium line-clamp-2">{img.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && filteredProjects.length === 0 && filteredGallery.length === 0 && (
          <div className="py-32 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
              <Filter size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No Intel Found</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">Adjust your filters or search query to explore APDFE regional communications.</p>
            <button 
              onClick={() => { setFilter('all'); setSearchQuery(''); }}
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:bg-blue-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Subscription Footer Callout */}
      <section className="bg-slate-900 py-32 rounded-t-[5rem] mt-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Stay Connected to the Field</h2>
          <p className="text-xl text-slate-400 font-light mb-12 leading-relaxed italic">
            "Transparency is the cornerstone of trust. Receive regional operational digests directly in your inbox."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="name@organization.org" className="flex-grow px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">Subscribe</button>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};
