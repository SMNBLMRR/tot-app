import Fastify, { FastifyInstance } from "fastify";
import config from "./config";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

async function buildServer() {
  try {
    //by default make logger prettier
    const fastify: FastifyInstance = Fastify({
      logger: {
        transport: {
          target: "pino-pretty",
        },
      },
    });

    //register app configuration
    await fastify.register(config);
    return fastify;
  } catch (error) {
    console.error(error);
  }
}

async function start() {
  try {
    const server = await buildServer();
    //host 0.0.0.0 this will work for docker container
    server?.listen({
      port,
      host: "0.0.0.0",
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
