import fp from 'fastify-plugin';
import OpenAI from 'openai';

const createOpenAIInstance = apiKey => new OpenAI({ apiKey });

const generateCompletion = (openai, model) => async ({ query }) => {
  const defaultMessages = [{ role: 'system', content: 'You are a helpful assistant.' }];
  const finalMessages = [...defaultMessages, { role: 'user', content: query }];
  const completion = await openai.chat.completions.create({
    messages: finalMessages,
    model: model,
  });
  return completion.choices[0]?.message?.content;
};

async function openAIPlugin(fastify, options) {
  const { apiKey, model = 'gpt-3.5-turbo' } = options;
  const openai = createOpenAIInstance(apiKey);
  const chatGPT = generateCompletion(openai, model);

  fastify.decorate('queryChatGPT', chatGPT);
}

export default fp(openAIPlugin);
