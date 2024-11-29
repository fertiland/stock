// src/services/ollamaService/index.js

import env from '../../config/env';

export const generateAnalysis = async (prompt) => {
  console.info("generateAnalysis is called.");
  try {
    const response = await fetch(`${env.OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral',
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to connect to Ollama: ${response.statusText}`);
    } else {
      const arrayBuffer = await response.arrayBuffer();
      const jsonResult = JSON.parse(new TextDecoder('utf-8').decode(arrayBuffer));
      console.info('Analysis result:', jsonResult);
      return jsonResult;
    }    
  } catch (error) {
    console.error(error);
    // You can also rethrow the error or handle it further depending on your requirements.
  }
};
