
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  MapPin, 
  Calendar, 
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
  Users
} from 'lucide-react';
import { useData } from '../context/MockDataContext';
import { Project } from '../types';

export const ProjectManagement = () => {
  const { projectId } = useParams();
  const { projects, updateProject, currentUser } = useData();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [newItem, setNewItem] = useState('');
  const [newNeed, setNewNeed] = useState('');

  useEffect(() => {
    const found = projects.find(p => p.id === projectId);
    if (found) {
      setProject(found);
      setFormData({
        title: found.title,
        status: found.status,
        region: found.region,
        timeline: found.timeline,
        beneficiaries: found.beneficiaries,
        description: found.description,
        progress: found.progress,
        completedItems: [...(found.completedItems || [])],
        missingItems: [...(found.missingItems || [])]
      });
    }
  }, [projectId, projects]);

  if (!currentUser) return <Navigate to="/login" />;
  if (!project) return <div className="p-20 text-center font-bold text-slate-400">Loading Intelligence...</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(project.id, formData);
    navigate('/dashboard');
  };

  const addItem = (type: 'completed' | 'missing') => {
    if (type === 'completed' && newItem.trim()) {
      setFormData({ ...formData, completedItems: [...(formData.completedItems || []), newItem.trim()] });
      setNewItem('');
    } else if (type === 'missing' && newNeed.trim()) {
      setFormData({ ...formData, missingItems: [...(formData.missingItems || []), newNeed.trim()] });
      setNewNeed('');
    }
  };

  const removeItem = (type: 'completed' | 'missing', index: number) => {
    if (type === 'completed') {
      const updated = [...(formData.completedItems || [])];
      updated.splice(index, 1);
      setFormData({ ...formData, completedItems: updated });
    } else if (type === 'missing') {
      const updated = [...(formData.missingItems || [])];
      updated.splice(index, 1);
      setFormData({ ...formData, missingItems: updated });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header Sticky Bar */}
      <header className="bg-white border-b border-slate-200 py-6 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-black tracking-tight">{formData.title}</h1>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Field Project Intelligence Editor</p>
          </div>
        </div>
        <button onClick={handleSave} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-sm flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">
          <Save size={18} /> Publish Updates
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          {/* Core Details Section */}
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-6 mb-6">
              <Info className="text-blue-600" size={24} />
              <h2 className="text-2xl font-black">Mission Context</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Project Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Operational Region</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Beneficiary Target</label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value={formData.beneficiaries} onChange={(e) => setFormData({...formData, beneficiaries: e.target.value})} className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Strategic Timeline</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})} className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Full Narrative Description</label>
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:ring-2 focus:ring-blue-500/20" placeholder="Describe the mission goals and challenges..." />
            </div>
          </section>

          {/* Milestones: What We've Completed */}
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={24} />
                <h2 className="text-2xl font-black">What We've Completed</h2>
              </div>
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Public Milestones</span>
            </div>

            <div className="space-y-4 mb-8">
              {formData.completedItems?.length ? formData.completedItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:bg-white hover:border-blue-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                  <button onClick={() => removeItem('completed', idx)} className="text-red-400 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              )) : (
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl text-center text-slate-400 font-bold italic text-sm">
                  "Initial phase complete. Detailed milestones pending updates."
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add a new milestone (e.g. Roof construction complete)" className="flex-grow px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:ring-2 focus:ring-blue-500/20" onKeyPress={(e) => e.key === 'Enter' && addItem('completed')} />
              <button onClick={() => addItem('completed')} className="px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all">
                <Plus size={20} />
              </button>
            </div>
          </section>

          {/* Urgent Project Needs */}
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-500" size={24} />
                <h2 className="text-2xl font-black">Urgent Project Needs</h2>
              </div>
              <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">Call to Action</span>
            </div>

            <div className="space-y-4 mb-8">
              {formData.missingItems?.length ? formData.missingItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-amber-50/10 border border-amber-100 rounded-2xl group transition-all hover:bg-white hover:border-amber-400">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={16} className="text-amber-500" />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                  <button onClick={() => removeItem('missing', idx)} className="text-red-400 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              )) : (
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl text-center text-slate-400 font-bold italic text-sm">
                  "Current operational goals fully funded."
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <input type="text" value={newNeed} onChange={(e) => setNewNeed(e.target.value)} placeholder="Add a need (e.g. Funding for 50 scholastic kits)" className="flex-grow px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:ring-2 focus:ring-blue-500/20" onKeyPress={(e) => e.key === 'Enter' && addItem('missing')} />
              <button onClick={() => addItem('missing')} className="px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all">
                <Plus size={20} />
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-32 space-y-8">
            {/* Status & Progress Card */}
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-xl font-black mb-10 flex items-center gap-2"><Clock size={20} /> Field Readiness</h3>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Execution Progress</span>
                    <span className="text-4xl font-black text-blue-500">{formData.progress}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mission Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none font-bold text-white transition-colors focus:border-blue-500">
                    <option value="In Progress" className="bg-slate-900">Active / In Progress</option>
                    <option value="Completed" className="bg-slate-900">Mission Completed</option>
                  </select>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                  <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-black text-white">Impact Verification</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-2 uppercase font-bold tracking-tight">
                      This project is verified by regional coordinators. 100% of contributions assigned here fund these listed needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Regional Oversight</p>
              <div className="flex items-center justify-center gap-2 text-slate-900 font-bold mb-6">
                <Users size={18} className="text-blue-600" /> Lead Coordinator Authorized
              </div>
              <button onClick={() => navigate('/dashboard')} className="w-full py-3 border-2 border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                Cancel Session
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
