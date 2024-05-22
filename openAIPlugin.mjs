import fp from 'fastify-plugin';
import OpenAI from 'openai';

const createOpenAIInstance = apiKey => new OpenAI({ apiKey });

const generateCompletion = openai => async ({ query }) => {
  const defaultMessages = [{ role: 'system', content: 'You are a helpful assistant.' }];
  const finalMessages = [...defaultMessages, { role: 'user', content: query }];
  const completion = await openai.chat.completions.create({
    messages: finalMessages,
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0]?.message?.content;
};

async function openAIPlugin(fastify, options) {
  const { apiKey } = options;
  const openai = createOpenAIInstance(apiKey);
  const chatGPT = generateCompletion(openai);

  fastify.decorate('queryChatGPT', chatGPT);
}

export default fp(openAIPlugin);
