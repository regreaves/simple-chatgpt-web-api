import Fastify from 'fastify';
import openAIPlugin from './openAIPlugin.mjs';

const buildServer = ({ apiKey, model }) => {
  const fastify = Fastify({ logger: true });
  fastify.register(openAIPlugin, { apiKey, model });

  fastify.post('/', async (request, reply) => {
    const result = await fastify.queryChatGPT({ query: request.body.query });
    return { content: result };
  });

  return fastify;
};

const main = async () => {
  const port = process.env.PORT || 3000;
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.MODEL || 'gpt-3.5-turbo';  
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY is required');
    process.exitCode = 1;
    return;
  }

  const server = buildServer({ apiKey, model });
  server.listen({ port }, err => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
      return;
    }
    console.log(`Server listening on port ${port}`);
  });
};

main();
