import { FastifyInstance } from "fastify";
import A from "@fastify/autoload";
import { join } from "node:path";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";
async function config(fastify: FastifyInstance, options: any) {
  //default error handler
  await fastify.register(fastifySensible);

  //openAPI
  await fastify.register(fastifySwagger);

  //openAPI front-end
  await fastify.register(SwaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  //register all plugin
  await fastify.register(A, {
    dir: join(__dirname, "plugins"),
    options: Object.assign({}, options),
  });

  //register all routes
  await fastify.register(A, {
    dir: join(__dirname, "routes"),
    options: Object.assign({ prefix: "/api/v1" }, options),
    dirNameRoutePrefix: false,
  });
}

export default config;
