import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Task } from "../entity/Task";

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    users: (parent, args, { parseOrderBy, parsePaginate }, info) => {
      console.log({
        order: parseOrderBy(args),
        ...parsePaginate(args),
        relations: ["tasks"]
      })
      return getRepository(User).find({
        order: parseOrderBy(args),
        ...parsePaginate(args),
        relations: ["tasks"]
      });
    }
  },
  Mutation: {
    addUser: (parent, args, { }, info) => {
      const { id, firstName, lastName, age } = args.input;
      return getRepository(User).save({
        id,
        firstName,
        lastName,
        age
      });
    },
    updateUser: (parent, { id, firstName, lastName, age }, { }, info) => {
      return getRepository(User).update(id, {
        firstName,
        lastName,
        age
      });
    },
    addTask: (parent, { id, title, userId }, { }, info) => {
      return getRepository(Task).save({
        id,
        title,
        user: userId
      });
    },
  }
};