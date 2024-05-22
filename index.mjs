import Fastify from 'fastify';
import openAIPlugin from './openAIPlugin.mjs';

const buildServer = apiKey => {
  const fastify = Fastify({ logger: true });
  fastify.register(openAIPlugin, { apiKey });

  fastify.post('/', async (request, reply) => {
    const result = await fastify.queryChatGPT({ query: request.body.query });
    return { content: result };
  });

  return fastify;
};

const startServer = async (server, port) => {
  try {
    await server.listen(port);
    console.log(`Listening on port ${port}...`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
};

const main = async () => {
  const port = process.env.PORT || 3000;
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY is required');
    process.exitCode = 1;
    return;
  }

  const server = buildServer(apiKey);
  await startServer(server, port);
};

main();
