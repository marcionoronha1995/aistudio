
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoginProject = async () => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Crie um sistema de login completo em Python modularizado com interface gráfica (GUI).
    Requisitos:
    - O usuário deve poder logar usando Nome, CPF ou E-mail em um único campo inteligente ou campos separados.
    - Use a biblioteca 'flet' para a interface gráfica (é moderna e baseada em Flutter).
    - O código deve ser profissional, com tratamento de erros e validações (regex para email, algoritmo de CPF).
    - Arquivos obrigatórios:
        1. main.py: Ponto de entrada.
        2. auth.py: Lógica de autenticação e validações.
        3. database.py: Persistência (mockada).
        4. gui.py: Definição da interface visual com Flet.
    - Gere uma documentação técnica detalhada em Markdown.
    - Forneça a estrutura de um mapa mental relacionando os arquivos e o fluxo da UI.

    Responda EXCLUSIVAMENTE em formato JSON seguindo este esquema:
    {
      "files": [
        {"name": "string", "content": "string", "description": "string"}
      ],
      "documentation": "string (markdown content)",
      "mentalMap": {
        "nodes": [{"id": "string", "label": "string", "type": "file|logic|ui"}],
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
