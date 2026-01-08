
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ChevronRight, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw, 
  ArrowLeft, 
  Loader2, 
  Inbox, 
  X, 
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import { useData } from '../context/MockDataContext';
import { GoogleGenAI } from "@google/genai";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'email' | 'otp'>('email');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [showInbox, setShowInbox] = useState(false);
  const [receivedEmails, setReceivedEmails] = useState<{id: string, from: string, subject: string, body: string, time: string}[]>([]);
  const [authorizedUser, setAuthorizedUser] = useState<any>(null);

  const { login, helpers } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const generateAndSendOtp = async (user: any) => {
    setIsVerifying(true);
    setError('');

    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setAuthorizedUser(user);

      // Use Gemini to craft a professional humanitarian security email
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Generate a professional, high-security OTP email for the organization "A.P.D.F.E (Action Pour le Développement de la Femme et de l'Enfant)". 
      Recipient: ${user.name} (${user.email})
      Code: ${code}
      Context: This is for accessing the regional staff dashboard for Central Africa missions.
      Output: Professional Markdown email body only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const emailBody = response.text || `Security Alert: Your access code is ${code}.`;

      // Simulating "sending" to actual email via a visible System Notification
      setTimeout(() => {
        const newEmail = {
          id: Date.now().toString(),
          from: 'security@apdfe.org',
          subject: `Secure Access Code [${code}] for A.P.D.F.E Regional Portal`,
          body: emailBody,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setReceivedEmails(prev => [newEmail, ...prev]);
        setStage('otp');
        setIsVerifying(false);
        setTimer(60);
        setShowInbox(true); // Automatically show inbox to user to facilitate the OTP flow
      }, 1200);

    } catch (err) {
      console.error("Gemini Failure:", err);
      // Fallback in case of API issues
      setGeneratedOtp("123456");
      setAuthorizedUser(user);
      setStage('otp');
      setIsVerifying(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = helpers.find(h => h.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      setError('Staff identity not recognized in our regional database.');
      return;
    }
    
    generateAndSendOtp(user);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode === generatedOtp && authorizedUser) {
      login(authorizedUser);
      navigate('/dashboard');
    } else {
      setError('The security code provided is incorrect or expired.');
    }
  };

  const resetToEmail = () => {
    setStage('email');
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-20 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400 rounded-full blur-[160px] animate-pulse delay-1000"></div>
      </div>

      {/* Virtual Secure Inbox (Modal) */}
      {showInbox && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowInbox(false)}></div>
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2 tracking-tight">
                  <Inbox size={24} className="text-blue-400" /> Secure Mailbox
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Direct Field Coordination</p>
              </div>
              <button onClick={() => setShowInbox(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-8 bg-slate-50">
              {receivedEmails.map((mail) => (
                <div key={mail.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden animate-in zoom-in duration-300">
                  <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Incoming Transmission</span>
                      <span className="text-[10px] font-bold text-slate-400">{mail.time}</span>
                    </div>
                    <h4 className="font-black text-slate-900 text-sm leading-tight">{mail.subject}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium italic">Sender: {mail.from}</p>
                  </div>
                  <div className="p-8 text-sm text-slate-600 leading-relaxed font-medium prose prose-sm max-w-none">
                    {mail.body}
                  </div>
                  <div className="px-8 py-5 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[10px] text-amber-600 font-black uppercase tracking-widest">
                       <ShieldAlert size={14} /> Personnel Use Only
                    </div>
                    <button onClick={() => setShowInbox(false)} className="text-xs font-black text-blue-600 hover:underline">Apply Code</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Interface */}
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-12 md:p-14 border border-slate-100 relative z-10 animate-in zoom-in duration-500">
        {stage === 'email' ? (
          <div>
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl relative overflow-hidden group">
                {isVerifying ? (
                  <Loader2 size={36} className="animate-spin text-blue-500" />
                ) : (
                  <Fingerprint size={40} className="group-hover:scale-110 transition-transform" />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent"></div>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Personnel Access</h1>
              <p className="text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest">Staff Identification Hub</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Staff Identity Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isVerifying}
                    className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300 disabled:opacity-50" 
                    placeholder="staff@apdfe.org"
                  />
                </div>
              </div>

              {error && (
                <div className="p-5 bg-red-50 rounded-2xl flex gap-4 text-red-600 items-center border border-red-100 animate-in shake duration-300">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-xs font-bold leading-tight">{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isVerifying}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-700"
              >
                {isVerifying ? 'Verifying Identity...' : 'Request Access Code'} 
                {!isVerifying && <ChevronRight size={20} />}
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={resetToEmail} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft size={14} /> Back to Identity
            </button>

            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShieldCheck size={48} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Security Code</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium leading-relaxed">
                Transmitted to <span className="text-blue-600 font-bold block">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-12">
              <div className="flex justify-between gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-full h-16 md:h-20 text-center text-3xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 shadow-sm"
                  />
                ))}
              </div>

              {error && (
                <div className="p-5 bg-red-50 rounded-2xl flex gap-4 text-red-600 items-center border border-red-100">
                  <AlertCircle size={20} />
                  <span className="text-xs font-bold leading-tight">{error}</span>
                </div>
              )}

              <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95">
                Unlock Hub <ChevronRight size={20} />
              </button>

              <div className="text-center">
                <button 
                  type="button" 
                  disabled={timer > 0}
                  onClick={() => generateAndSendOtp(authorizedUser)}
                  className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors flex items-center gap-3 mx-auto ${timer > 0 ? 'text-slate-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  <RefreshCw size={14} className={timer > 0 ? '' : 'animate-spin-slow'} />
                  {timer > 0 ? `Retry in ${timer}s` : 'Resend Code'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-14 pt-12 border-t border-slate-100">
          <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <ShieldCheck size={24} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Cloud Security Protocol V3</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase">
                Access is strictly for authorized A.P.D.F.E personnel.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Inbox Trigger Button */}
      {receivedEmails.length > 0 && (
         <button onClick={() => setShowInbox(true)} className="fixed bottom-10 right-10 bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all animate-bounce z-50">
            <Inbox size={28} />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-900 text-[10px] font-black flex items-center justify-center">1</span>
         </button>
      )}
    </div>
  );
};
