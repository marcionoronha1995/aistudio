
import React, { useState } from 'react';

const LoginPreview: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'unknown' | 'cpf' | 'email' | 'name'>('unknown');

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
      <div className="bg-blue-600 p-8 text-center text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Bem-vindo</h2>
        <p className="text-blue-100 text-sm mt-1">Acesse sua conta para continuar</p>
      </div>
      
      <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
            <span>Login</span>
            <span className={`transition-colors ${type !== 'unknown' ? 'text-blue-600' : 'text-slate-400'}`}>
              {getTypeLabel()}
            </span>
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={identifier}
              onChange={handleIdentifierChange}
              placeholder="Nome, CPF ou E-mail"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <div className="absolute right-3 top-3 text-slate-400">
              {type === 'email' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
              {type === 'cpf' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>}
              {type === 'name' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
            Lembrar de mim
          </label>
          <a href="#" className="text-blue-600 hover:underline font-medium">Esqueceu a senha?</a>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
          Entrar
        </button>

        <p className="text-center text-slate-500 text-sm">
          Não tem uma conta? <a href="#" className="text-blue-600 font-bold hover:underline">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPreview;
