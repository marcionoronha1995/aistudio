
import React, { useState, useEffect } from 'react';
import { generateLoginProject } from './geminiService';
import { ProjectData, AppStatus } from './types';
import ArchitectureMap from './components/ArchitectureMap';
import CodeBlock from './components/CodeBlock';
import LoginPreview from './components/LoginPreview';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'docs' | 'map' | 'preview'>('code');

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
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Py</span>
            </div>
            <h1 className="font-bold text-slate-800 text-lg">Gerador de Login Python</h1>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={status === AppStatus.GENERATING}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-sm ${
              status === AppStatus.GENERATING 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            {status === AppStatus.GENERATING ? 'Gerando...' : 'Gerar Novo Projeto'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {status === AppStatus.IDLE && (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Crie seu Sistema de Login</h2>
              <p className="text-slate-500 mb-8">Gere automaticamente um projeto Python modular com interface gráfica e validações de Nome, CPF e E-mail.</p>
              <button
                onClick={handleGenerate}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
              >
                Começar agora
              </button>
            </div>
          </div>
        )}

        {status === AppStatus.GENERATING && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-blue-600 font-bold">IA</span>
              </div>
            </div>
            <p className="mt-6 text-slate-600 font-medium animate-pulse">Gemini está arquitetando sua aplicação e UI...</p>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center text-red-600">
            <h3 className="font-bold text-lg mb-2">Erro na Geração</h3>
            <p className="mb-4">Ocorreu um problema ao conectar com a IA. Por favor, tente novamente.</p>
            <button onClick={handleGenerate} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">Tentar Novamente</button>
          </div>
        )}

        {status === AppStatus.READY && project && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-24">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'code' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Código Fonte
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'preview' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview da UI
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'docs' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documentação
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'map' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Mapa Mental
                </button>
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-9 space-y-6">
              {activeTab === 'code' && (
                <div className="animate-in fade-in duration-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Estrutura do Projeto</h3>
                  {project.files.map((file, idx) => (
                    <div key={idx} className="mb-8">
                      <div className="flex items-start gap-3 mb-2">
                         <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                         <p className="text-sm text-slate-600 italic">{file.description}</p>
                      </div>
                      <CodeBlock filename={file.name} code={file.content} />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="animate-in fade-in duration-500 flex flex-col items-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 self-start">Interface Simulada</h3>
                  <p className="text-slate-600 mb-8 self-start text-sm">Abaixo está uma representação visual de como a tela de login gerada em Python se comportará.</p>
                  <LoginPreview />
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm animate-in fade-in duration-500 prose max-w-none prose-slate">
                  <div dangerouslySetInnerHTML={{ __html: project.documentation.replace(/\n/g, '<br/>') }} />
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
                      {project.documentation}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="animate-in slide-in-from-bottom duration-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Relacionamento de Arquivos</h3>
                  <p className="text-slate-600 mb-6 text-sm">Este gráfico ilustra como os componentes do sistema e a UI se comunicam.</p>
                  <ArchitectureMap data={project.mentalMap} />
                  
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="p-4 bg-white border border-slate-200 rounded-xl">
                        <span className="text-xs font-bold text-blue-600 uppercase mb-2 block">Fluxo Principal</span>
                        <p className="text-sm text-slate-600">A camada de UI (<code className="bg-slate-100 px-1 rounded">gui.py</code>) captura os eventos e envia para a lógica em <code className="bg-slate-100 px-1 rounded">auth.py</code>.</p>
                     </div>
                     <div className="p-4 bg-white border border-slate-200 rounded-xl">
                        <span className="text-xs font-bold text-green-600 uppercase mb-2 block">Persistência</span>
                        <p className="text-sm text-slate-600">A camada <code className="bg-slate-100 px-1 rounded">database.py</code> isola o acesso aos dados, simulando um banco de dados real.</p>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action (Footer) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xs text-slate-400">Desenvolvido com IA Gemini 3 Flash e React.</p>
          <div className="flex gap-4">
             <a href="https://docs.python.org/3/" target="_blank" className="text-xs text-blue-600 hover:underline">Documentação Python</a>
             <a href="https://flet.dev/docs/" target="_blank" className="text-xs text-blue-600 hover:underline">Flet GUI Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
