
import React, { useState } from 'react';

const LoginPreview: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'unknown' | 'cpf' | 'email' | 'name'>('unknown');
  const [isSecure, setIsSecure] = useState(true);

  const detectType = (val: string) => {
    if (!val) return 'unknown';
    if (val.includes('@')) return 'email';
    if (/^\d+$/.test(val.replace(/[.-]/g, '')) && val.replace(/[.-]/g, '').length === 11) return 'cpf';
    return 'name';
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIdentifier(val);
    setType(detectType(val));
  };

  const getTypeLabel = () => {
    switch(type) {
      case 'email': return 'E-mail Detectado';
      case 'cpf': return 'CPF Detectado';
      case 'name': return 'Nome de Usuário';
      default: return 'Identificador';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in duration-300">
      <div className="bg-slate-900 p-8 text-center text-white relative">
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">Secure Hashing</span>
        </div>
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Portal Seguro</h2>
        <p className="text-slate-400 text-sm mt-1">Sua senha será processada com SHA-256</p>
      </div>
      
      <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
            <span>Login</span>
            <span className={`transition-colors font-mono ${type !== 'unknown' ? 'text-blue-600' : 'text-slate-400'}`}>
              {getTypeLabel()}
            </span>
          </label>
          <div className="relative group">
            <input 
              type="text" 
              value={identifier}
              onChange={handleIdentifierChange}
              placeholder="Nome, CPF ou E-mail"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all group-hover:border-slate-300"
            />
            <div className="absolute right-3 top-3 text-slate-400 transition-transform group-focus-within:scale-110">
              {type === 'email' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
              {type === 'cpf' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>}
              {type === 'name' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              {type === 'unknown' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
            <span>Senha</span>
            {password && <span className="text-[10px] text-slate-400 font-mono italic">Hashing detectado...</span>}
          </label>
          <div className="relative group">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-medium">
          <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            Lembrar acesso
          </label>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Problemas ao entrar?</a>
        </div>

        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2">
          <span>Verificar Credenciais</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-4">
           <div className="flex gap-2">
             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
               <span className="text-xs font-bold text-slate-400">G</span>
             </div>
             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
               <span className="text-xs font-bold text-slate-400">A</span>
             </div>
           </div>
           <p className="text-center text-slate-400 text-xs">
            Precisa de ajuda? <a href="#" className="text-blue-600 font-bold hover:underline">Fale com o suporte</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPreview;
