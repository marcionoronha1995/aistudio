
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoginProject = async () => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Crie um sistema de login profissional e SEGURO em Python.
    
    Requisitos Técnicos do Código:
    - O login deve ser encapsulado em uma função principal 'fazer_login()' que retorna um booleano ou objeto de usuário.
    - SEGURANÇA: As senhas NÃO podem ser gravadas em texto plano. Use a biblioteca 'hashlib' (sha256 com salt) para simular o armazenamento seguro.
    - O sistema deve verificar o acesso comparando o hash da senha digitada com o hash armazenado.
    - Aceitar Nome, CPF ou E-mail no campo de identificação em uma única lógica de busca.
    - Modularização:
        1. auth.py: Funções de hashing (hash_password, verify_password) e lógica de validação.
        2. database.py: Simulação de DB com dicionários contendo Hashes de senhas.
        3. gui.py: Interface Flet (GUI) com feedback visual de erro/sucesso.
        4. main.py: Ponto de entrada que chama a função de login e inicia a UI.

    Conteúdo da Documentação (Markdown):
    - Explicação didática sobre Hashing (SHA-256) e por que não usar criptografia reversível para senhas.
    - Guia de instalação das dependências (flet).
    - Seção "Tecnologias Alternativas para Produção": Sugira Stacks modernas como:
        - Web: FastAPI + SQLAlchemy + PostgreSQL + JWT (Bearer Token).
        - Frontend: React (Vite) + Tailwind CSS + Auth.js.
        - Mobile: Flutter + Firebase Auth.

    Estrutura do Mapa Mental:
    - Inclua o nó de "Camada de Segurança/Hash" entre a UI e o Banco de Dados.

    Responda EXCLUSIVAMENTE em formato JSON seguindo este esquema:
    {
      "files": [
        {"name": "string", "content": "string", "description": "string"}
      ],
      "documentation": "string (markdown content)",
      "mentalMap": {
        "nodes": [{"id": "string", "label": "string", "type": "file|logic|security|ui"}],
        "links": [{"source": "string", "target": "string"}]
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            files: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  content: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "content", "description"]
              }
            },
            documentation: { type: Type.STRING },
            mentalMap: {
              type: Type.OBJECT,
              properties: {
                nodes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      type: { type: Type.STRING }
                    },
                    required: ["id", "label", "type"]
                  }
                },
                links: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      source: { type: Type.STRING },
                      target: { type: Type.STRING }
                    },
                    required: ["source", "target"]
                  }
                }
              },
              required: ["nodes", "links"]
            }
          },
          required: ["files", "documentation", "mentalMap"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro na geração:", error);
    throw error;
  }
};
