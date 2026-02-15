
import React, { useState } from 'react';
import { generateLoginProject } from './geminiService';
import { ProjectData, AppStatus } from './types';
import ArchitectureMap from './components/ArchitectureMap';
import CodeBlock from './components/CodeBlock';
import LoginPreview from './components/LoginPreview';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'docs' | 'map'>('code');

  const handleGenerate = async () => {
    setStatus(AppStatus.GENERATING);
    try {
      const data = await generateLoginProject();
      setProject(data);
      setStatus(AppStatus.READY);
    } catch (err) {
      console.error(err);
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Focus: Login Screen */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        {!project && status === AppStatus.IDLE ? (
          <div className="text-center space-y-8 animate-in fade-in duration-700">
            <div className="space-y-4">
               <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">PySecure Login</h1>
               <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
                 Sistema de autenticação modular em Python com hashing SHA-256 e interface moderna.
               </p>
            </div>
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
            >
              Iniciar Geração do Sistema
            </button>
          </div>
        ) : status === AppStatus.GENERATING ? (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="w-20 h-20 border-8 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-bold tracking-wide uppercase text-sm">Construindo Módulos de Segurança...</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <LoginPreview />
            
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setShowInfo(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver Informações do Programa
              </button>
              <button onClick={handleGenerate} className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                Regerar Código
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Technical Info Panel (Modal Overlay) */}
      {showInfo && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowInfo(false)}></div>
          
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative z-10">
            {/* Modal Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Documentação Técnica</h2>
                <p className="text-sm text-slate-500 font-medium">Arquitetura, código fonte e mapeamento de segurança</p>
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto">
              {[
                {id: 'code', label: 'Código Fonte', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'},
                {id: 'docs', label: 'Documentação', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'},
                {id: 'map', label: 'Mapa Mental', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'}
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
              {activeTab === 'code' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {project.files.map((file, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{file.description}</span>
                      </div>
                      <CodeBlock filename={file.name} code={file.content} />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm prose max-w-none animate-in fade-in duration-300">
                  <div dangerouslySetInnerHTML={{ __html: project.documentation.replace(/\n/g, '<br/>') }} />
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Texto Markdown</h4>
                    <pre className="text-xs bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap">{project.documentation}</pre>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Diagrama de Fluxo e Segurança</h3>
                    <ArchitectureMap data={project.mentalMap} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                      <h4 className="font-bold mb-2">Interface Inteligente</h4>
                      <p className="text-xs opacity-90 leading-relaxed">Detecção proativa de formato e validação de regras de negócio antes do envio.</p>
                    </div>
                    <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-lg">
                      <h4 className="font-bold mb-2">Camada de Hash</h4>
                      <p className="text-xs opacity-90 leading-relaxed">Criptografia de via única (SHA-256) garante que a senha original nunca seja armazenada.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-2">Acesso Unificado</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Busca no banco de dados por múltiplos identificadores (Email/CPF/Nome).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action (Regenerate - optional, kept in main view) */}
      <footer className="p-6 text-center z-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Gerador de Auth Seguro v2.1 • Powered by Gemini 3 Flash</p>
      </footer>
    </div>
  );
};

export default App;
