import TotError from "../../errors/customError";
import { prisma } from "../../plugins/db";
import { User } from "../../types/user";

export interface UserServiceInterface {
  createUser: (payload: User) => Promise<User>;
  findUser: (email: string) => Promise<User | null>;
}

function UserService(): UserServiceInterface {
  async function createUser(payload: User) {
    let user = await findUser(payload.email);
    if (user) throw new TotError("User already exist");
    return await prisma.user.create({
      data: {
        ...payload,
      },
    });
  }

  async function findUser(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  return {
    createUser,
    findUser,
  };
}

export { UserService };
