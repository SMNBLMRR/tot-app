import { FastifyInstance } from "fastify";
import { userRegisterBody, userRegisterResponse } from "../../schemas/user";
import { UserController } from "./user.controller";

async function userRoute(fastify: FastifyInstance, options: any) {
  const { handleUserRegistration } = UserController();
  fastify.route({
    method: "POST",
    url: "signup",
    schema: {
      body: userRegisterBody,
      response: {
        201: userRegisterResponse,
      },
    },
    handler: handleUserRegistration,
  });
}
export default userRoute;
