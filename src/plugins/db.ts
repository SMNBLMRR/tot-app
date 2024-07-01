import { FastifyInstance } from 'fastify';

import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function db(fastify: FastifyInstance, options:any) {
  await prisma.$connect();
  fastify.decorate('prisma', prisma);
  fastify.addHook('onClose', async (instance) => {
    // @ts-ignore
    await instance.prisma.$disconnect();
  });
}

export default fp(db, {
  name: 'Fastify-prisma',
});