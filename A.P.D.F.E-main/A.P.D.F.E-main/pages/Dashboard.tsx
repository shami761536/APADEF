
import React, { useState, useRef, useMemo } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/MockDataContext';
import { 
  Users, 
  Heart, 
  Briefcase, 
  Plus, 
  CheckCircle, 
  Wallet, 
  Settings, 
  LogOut, 
  FileText, 
  LayoutDashboard, 
  Globe, 
  Bell, 
  Search,
  ArrowUpRight,
  TrendingUp,
  Activity,
  BarChart3,
  User as UserIcon,
  Camera,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  Upload,
  Trash2,
  AlertCircle,
  PieChart as PieChartIcon,
  Zap,
  ShieldCheck,
  ArrowDownRight,
  Filter,
  CreditCard,
  Building,
  Target,
  Mail,
  MapPin,
  RefreshCw,
  Menu,
  Sparkles,
  Type,
  UserPlus,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { Project, Donation, Expense, NewsUpdate, GalleryItem, User, Volunteer } from '../types';

export const Dashboard = () => {
  const { 
    currentUser, 
    logout, 
    news, 
    projects, 
    donations, 
    expenses,
    volunteers,
    helpers, 
    gallery,
    updateCurrentProfile,
    addNews,
    addImage,
    addProject,
    addDonation,
    addExpense,
    registerStaff,
    resetDatabase,
    getAggregates
  } = useData();
  
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time aggregates from Context
  const stats = useMemo(() => getAggregates(), [donations, expenses, projects, volunteers]);

  const [tab, setTab] = useState<'overview' | 'content' | 'community' | 'wallet' | 'insights' | 'users' | 'profile'>('overview');
  const [contentSubTab, setContentSubTab] = useState<'All' | 'News' | 'Images' | 'Projects'>('All');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creationStep, setCreationStep] = useState<'select' | 'form'>('select');
  const [selectedCreateType, setSelectedCreateType] = useState<'News' | 'Images' | 'Projects' | null>(null);
  const [publicationForm, setPublicationForm] = useState<any>({});

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', role: 'helper' as 'admin' | 'helper' });

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'Income' | 'Expense'>('Income');
  const [financialForm, setFinancialForm] = useState<any>({});

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(currentUser?.name || '');

  const unifiedLedger = useMemo(() => {
    const ledger = [
      ...(donations || []).map(d => ({ ...d, type: 'Income' })),
      ...(expenses || []).map(e => ({ ...e, type: 'Expense', name: e.description || 'Project Support', source: e.category || 'Field' }))
    ];
    return ledger.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [donations, expenses]);

  if (!currentUser) return <Navigate to="/login" />;
  const isAdmin = currentUser.role === 'admin';
  const isRootAdmin = currentUser.email === 'kennytohne@gmail.com';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentProfile({ name: editedName });
    setIsEditingProfile(false);
  };

  const handleStaffRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    registerStaff(registerForm.name, registerForm.email, registerForm.role);
    setIsRegisterModalOpen(false);
    setRegisterForm({ name: '', email: '', role: 'helper' });
  };

  const handlePublicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `p-${Date.now()}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (selectedCreateType === 'News') {
      addNews({ id, title: publicationForm.title, date, category: publicationForm.category || 'Regional Update', excerpt: publicationForm.excerpt, image: publicationForm.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' });
    } else if (selectedCreateType === 'Projects') {
      addProject({ id, title: publicationForm.title, status: 'In Progress', region: publicationForm.region, timeline: publicationForm.timeline, beneficiaries: publicationForm.beneficiaries, description: publicationForm.description, progress: 0, completedItems: ["Intelligence protocol established"], missingItems: ["Regional resources pending acquisition"], lastUpdated: date });
    } else if (selectedCreateType === 'Images') {
      addImage({ id, title: publicationForm.title, subtitle: publicationForm.subtitle, img: publicationForm.img || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop' });
    }

    setIsCreateModalOpen(false);
    setPublicationForm({});
    setCreationStep('select');
  };

  const handleFinancialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `f-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];
    if (checkoutType === 'Income') {
      addDonation({ id, name: financialForm.name, amount: parseFloat(financialForm.amount), date, source: financialForm.source || 'Direct Contribution', status: 'Cleared' });
    } else {
      addExpense({ id, category: (financialForm.category as any) || 'Field Projects', amount: parseFloat(financialForm.amount), date, description: financialForm.description, recipient: financialForm.recipient || 'Regional Vendor', status: 'Cleared' });
    }
    setIsCheckoutModalOpen(false);
    setFinancialForm({});
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white flex flex-col sticky top-0 h-screen z-50 overflow-y-auto shrink-0 shadow-2xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-full md:w-20' : 'w-full md:w-80'}`}>
        <div className={`p-8 flex items-center gap-3 border-b border-white/5 transition-all duration-300 ${isCollapsed ? 'justify-center p-6' : ''}`}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <Globe size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-500 overflow-hidden whitespace-nowrap">
              <div className="text-xl font-black tracking-tight leading-none">APDFE <span className="text-blue-500">HQ</span></div>
              <div className="text-[10px] uppercase font-bold text-slate-500 mt-1.5 tracking-[0.2em]">Regional Intelligence</div>
            </div>
          )}
        </div>
        
        <div className="p-4 md:p-6 space-y-1.5 flex-grow">
          <button onClick={() => setTab('overview')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${tab === 'overview' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <LayoutDashboard size={18} /> {!isCollapsed && <span>Dashboard Overview</span>}
          </button>
          
          <button onClick={() => setTab('content')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${tab === 'content' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <FileText size={18} /> {!isCollapsed && <span>Field Publications</span>}
          </button>
          
          <button onClick={() => setTab('community')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${tab === 'community' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <Users size={18} /> {!isCollapsed && <span>Staff & Volunteers</span>}
          </button>
          
          {isAdmin && (
            <>
              <div className={`mt-8 mb-2 px-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.25em]">Strategic Access</p>
              </div>
              <button onClick={() => setTab('wallet')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${tab === 'wallet' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
                <Wallet size={18} /> {!isCollapsed && <span>Finance Ledger</span>}
              </button>
              <button onClick={() => setTab('users')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${tab === 'users' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
                <ShieldCheck size={18} /> {!isCollapsed && <span>Personnel Hub</span>}
              </button>
            </>
          )}
        </div>

        <div className="p-6 mt-auto border-t border-white/5">
          <button onClick={() => setTab('profile')} className={`w-full flex items-center gap-3 p-3.5 mb-2 rounded-xl text-sm font-bold transition-all ${tab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
             <UserIcon size={18} /> {!isCollapsed && <span>Identity Profile</span>}
          </button>
          <button onClick={handleLogout} className={`w-full flex items-center gap-3 p-3.5 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-black transition-all ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut size={18} /> {!isCollapsed && <span>Secure Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main UI */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 py-4 px-10 flex justify-between items-center sticky top-0 z-40 shadow-sm">
           <div className="flex items-center gap-6">
             <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors hidden md:block">
               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
             </button>
             <div className="text-xs font-black uppercase tracking-widest text-slate-400 hidden sm:block">A.P.D.F.E Cloud Portal</div>
           </div>
           <div className="flex items-center gap-4">
             <Link to="/" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all">Public Portal</Link>
           </div>
        </header>

        <main className="p-8 md:p-12 space-y-12">
          {tab === 'overview' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="flex justify-between items-end">
                 <div>
                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Overview</h1>
                   <p className="text-slate-400 mt-1 font-bold uppercase tracking-widest text-[10px]">Real-time cloud metrics</p>
                 </div>
                 <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div> Live Database Connection
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Regional Intake", value: `$${stats.totalRevenue.toLocaleString()}`, icon: <Wallet className="text-blue-600" /> },
                  { label: "Community", value: stats.volunteerCount, icon: <Users className="text-green-600" /> },
                  { label: "Active Missions", value: stats.projectCount, icon: <Target className="text-amber-600" /> },
                  { label: "Beneficiaries", value: stats.activeBeneficiaries, icon: <Heart className="text-red-600" /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                    <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">{stat.icon}</div>
                    <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black flex items-center gap-2"><TrendingUp className="text-blue-600" /> Strategic Resource Intake</h3>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Monthly Audit</span>
                  </div>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.revenueHistory}>
                        <defs>
                          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                   <h3 className="text-xl font-black mb-8 relative z-10 flex items-center gap-2"><Zap size={20} className="text-amber-400" /> Operational Health</h3>
                   <div className="space-y-10 relative z-10">
                     <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Execution Efficiency</span>
                           <span className="text-lg font-black text-blue-400">88%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[88%]"></div>
                        </div>
                     </div>
                     <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sustainability Index</span>
                           <span className="text-lg font-black text-green-400">95%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[95%]"></div>
                        </div>
                     </div>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          )}

          {tab === 'content' && (
            <div className="space-y-8 animate-in fade-in duration-700">
               <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">Publication Hub</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Direct Field Press Management</p>
                </div>
                <button onClick={() => { setCreationStep('select'); setIsCreateModalOpen(true); }} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all">
                  <Plus size={18} /> Deploy New Intelligence
                </button>
              </div>

              <div className="flex items-center gap-4 p-2 bg-slate-100 rounded-2xl w-fit">
                {['All', 'News', 'Projects', 'Images'].map((sub) => (
                  <button key={sub} onClick={() => setContentSubTab(sub as any)} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${contentSubTab === sub ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {sub}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Publication Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Regional Metadata</th>
                        <th className="px-10 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Management</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(contentSubTab === 'All' || contentSubTab === 'News') && news.map(n => (
                        <tr key={n.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-10 py-8">
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-black">N</div>
                               <span className="font-black text-slate-900 text-sm leading-tight">{n.title}</span>
                             </div>
                           </td>
                           <td className="px-10 py-8">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{n.category} • {n.date}</span>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Edit Entry</button>
                           </td>
                        </tr>
                      ))}
                      {(contentSubTab === 'All' || contentSubTab === 'Projects') && projects.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-10 py-8">
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-black">P</div>
                               <span className="font-black text-slate-900 text-sm leading-tight">{p.title}</span>
                             </div>
                           </td>
                           <td className="px-10 py-8">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.region} • {p.progress}% Readiness</span>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <Link to={`/dashboard/project/${p.id}`} className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:underline">Intelligence Editor</Link>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {tab === 'wallet' && isAdmin && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">Strategic Ledger</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Cloud Ledger</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { setCheckoutType('Income'); setIsCheckoutModalOpen(true); }} className="px-6 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-green-700 shadow-xl transition-all">
                    <Plus size={18} /> Log Intake
                  </button>
                  <button onClick={() => { setCheckoutType('Expense'); setIsCheckoutModalOpen(true); }} className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all">
                    <Plus size={18} /> Log Outflow
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="relative z-10">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Operational Assets</p>
                     <p className="text-5xl font-black text-slate-900">${(stats.totalRevenue - stats.totalExpenses).toLocaleString()}</p>
                   </div>
                   <div className="absolute top-0 right-0 p-8 text-blue-50 group-hover:text-blue-100 transition-colors">
                      <Wallet size={80} strokeWidth={1} />
                   </div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cumulative Intake</p>
                   <p className="text-5xl font-black text-green-600">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cumulative Burn</p>
                   <p className="text-5xl font-black text-red-500">${stats.totalExpenses.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Entity / Purpose</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-sm">
                       {unifiedLedger.map((item: any, idx) => (
                         <tr key={idx} className="hover:bg-slate-50 transition-colors">
                           <td className="px-10 py-8 text-xs text-slate-400">{item.date}</td>
                           <td className="px-10 py-8">
                             <div className="font-black text-slate-900 leading-tight">{item.name || item.description}</div>
                             <div className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mt-1">{item.source || item.category}</div>
                           </td>
                           <td className={`px-10 py-8 text-right font-black text-lg ${item.type === 'Income' ? 'text-green-600' : 'text-red-500'}`}>
                             {item.type === 'Income' ? '+' : '-'}${item.amount.toLocaleString()}
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {tab === 'users' && isAdmin && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">Personnel Directory</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Access Authorization Ledger</p>
                </div>
                {isRootAdmin && (
                  <button onClick={() => setIsRegisterModalOpen(true)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 shadow-xl transition-all">
                    <UserPlus size={18} /> Provision Staff
                  </button>
                )}
              </div>

              <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Personnel Identity</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Access</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Authorization Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {helpers.map(h => (
                      <tr key={h.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><UserIcon size={20} /></div>
                              <span className="font-black text-slate-900 text-sm leading-tight">{h.name} {h.email === 'kennytohne@gmail.com' && <Sparkles size={12} className="text-blue-500 inline ml-1" />}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-sm text-slate-400 font-bold">{h.email}</td>
                        <td className="px-10 py-8">
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${h.role === 'admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-600'}`}>
                             {h.role === 'admin' ? 'Regional Lead' : 'Field Helper'}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {tab === 'profile' && (
            <div className="max-w-4xl animate-in fade-in duration-700">
              <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-44 bg-slate-900 relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                </div>
                <div className="px-12 pb-16 -mt-24 relative z-10">
                  <div className="flex flex-col md:flex-row items-end gap-10 mb-12">
                    <div className="w-44 h-44 rounded-[2.8rem] bg-white p-2 shadow-2xl relative group overflow-hidden border-2 border-slate-100 flex items-center justify-center">
                      {currentUser.profilePicture ? (
                         <img src={currentUser.profilePicture} className="w-full h-full object-cover rounded-[2.5rem]" alt="Profile" />
                      ) : (
                         <div className="w-full h-full rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-200 font-black text-6xl">
                           {currentUser.name.charAt(0)}
                         </div>
                      )}
                      <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                        <Camera size={36} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Update Portrait</span>
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => updateCurrentProfile({ profilePicture: reader.result as string });
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </div>
                    <div className="flex-grow pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{currentUser.name}</h2>
                        <span className="px-5 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full shadow-lg">{currentUser.role}</span>
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 italic"><Mail size={14} className="text-blue-500" /> {currentUser.email}</p>
                    </div>
                    <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="px-10 py-4 border-2 border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all mb-4 active:scale-95">
                       {isEditingProfile ? 'Cancel Edit' : 'Modify Record'}
                    </button>
                  </div>
                  
                  {isEditingProfile ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Legal Identity Alias</label>
                          <input required type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl focus:ring-4 focus:ring-blue-500/10" />
                        </div>
                      </div>
                      <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-3">
                         <Save size={20} /> Deploy Intelligence Update
                      </button>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.25em] mb-4">Security Clearance</h4>
                          <div className="flex items-center gap-5">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100"><ShieldCheck size={28} /></div>
                             <p className="text-sm font-black text-slate-900">Multi-Factor Cloud Verified</p>
                          </div>
                       </div>
                       <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.25em] mb-4">Mission Assignment</h4>
                          <div className="flex items-center gap-5">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100"><Globe size={28} /></div>
                             <p className="text-sm font-black text-slate-900">Regional Coordination Hub</p>
                          </div>
                       </div>
                    </div>
                  )}

                  {isRootAdmin && (
                    <div className="mt-20 pt-16 border-t border-slate-100">
                       <h4 className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em] mb-8">System Maintenance Protocol</h4>
                       <div className="p-12 bg-red-50 rounded-[3.5rem] border border-red-100 space-y-8">
                          <div className="flex items-start gap-5">
                            <AlertCircle className="text-red-500 shrink-0 mt-1" size={24} />
                            <div className="space-y-2">
                               <p className="text-lg font-black text-red-900 leading-tight">Hard Cache Purge Terminal</p>
                               <p className="text-xs text-red-600 font-bold leading-relaxed uppercase">
                                 Executing this directive will purge all local data syncs and terminate active staff sessions across the regional network.
                               </p>
                            </div>
                          </div>
                          <button onClick={() => { if(confirm("Executing hard purge?")) resetDatabase(); }} className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all flex items-center gap-3">
                             <RefreshCw size={20} /> Execute Terminal Purge
                          </button>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* STAFF PROVISIONING (Root Only) */}
      {isRegisterModalOpen && isRootAdmin && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsRegisterModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-12 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Provision Personnel</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Assign Regional Hub Authorization</p>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
            </div>
            <form onSubmit={handleStaffRegister} className="p-12 space-y-10">
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Legal Personnel Name</label>
                 <input required type="text" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg" value={registerForm.name} onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})} />
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">A.P.D.F.E Identity Email</label>
                 <input required type="email" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} />
               </div>
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Clearance Authorization Level</label>
                 <div className="flex gap-4">
                   {['helper', 'admin'].map(r => (
                     <button key={r} type="button" onClick={() => setRegisterForm({...registerForm, role: r as any})} className={`flex-1 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border-2 ${registerForm.role === r ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-500/10' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                        {r === 'admin' ? 'Regional Lead' : 'Field Helper'}
                     </button>
                   ))}
                 </div>
               </div>
               <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all">Publish Personnel Record</button>
            </form>
          </div>
        </div>
      )}

      {/* FINANCE MODAL */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsCheckoutModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Ledger Transmission</h3>
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Resource Commit</p>
               </div>
               <button onClick={() => setIsCheckoutModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
            </div>
            <div className="p-12 space-y-12">
              <div className="flex bg-slate-100 p-2 rounded-[1.8rem] w-full shadow-inner">
                <button onClick={() => setCheckoutType('Income')} className={`flex-1 py-4 px-6 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${checkoutType === 'Income' ? 'bg-white text-green-600 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Operational Intake</button>
                <button onClick={() => setCheckoutType('Expense')} className={`flex-1 py-4 px-6 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${checkoutType === 'Expense' ? 'bg-white text-red-500 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Operational Burn</button>
              </div>
              <form onSubmit={handleFinancialSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Amount Identity ($)</label>
                     <input required type="number" step="0.01" className="w-full px-7 py-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-4xl focus:ring-4 focus:ring-blue-500/10" placeholder="0.00" onChange={(e) => setFinancialForm({ ...financialForm, amount: e.target.value })} />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">{checkoutType === 'Income' ? 'Donor Entity' : 'Service Recipient'}</label>
                     <input required type="text" className="w-full px-7 py-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl" placeholder="Identity" onChange={(e) => setFinancialForm({ ...financialForm, name: e.target.value })} />
                   </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Strategic Mission Purpose</label>
                  <input required type="text" className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-sm" placeholder="Purpose details..." onChange={(e) => setFinancialForm({ ...financialForm, description: e.target.value })} />
                </div>
                <button type="submit" className={`w-full py-6 ${checkoutType === 'Income' ? 'bg-green-600' : 'bg-slate-900'} text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.25em] shadow-2xl transition-all active:scale-95`}>Commit Transaction to Cloud</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
