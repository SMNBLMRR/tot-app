import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../types/user";
import { UserService } from "./user.service";
import TotError from "../../errors/customError";

function UserController() {
  const userService = UserService();

  //'this' refers to the Fastify instance, 
  //allowing us to access httpErrors from @fastify/sensible

  async function handleUserRegistration(
    req: FastifyRequest<{ Body: User }>,
    res: FastifyReply
  ) {
    try {
      let user = await userService.createUser(req.body);

      if (user) {
        res.code(201);
        return {
          email: user.email,
          username: user.username,
        };
      }

      return this.httpErrors.badRequest();
    } catch (error) {
      console.error(error);
      if(error instanceof TotError){
        return this.httpErrors.badRequest(error.message);  
      }
      return this.httpErrors.badRequest();
    }
  }

  return {
    handleUserRegistration,
  };
}

export { UserController };
