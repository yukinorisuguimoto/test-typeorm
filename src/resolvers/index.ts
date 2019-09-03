import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Task } from "../entity/Task";

export const resolvers = {
  Query: {
    users: (parent, args, { parseOrderBy, parsePaginate }, info) => {
      return getRepository(User).find({
        order: parseOrderBy(args),
        ...parsePaginate(args),
        relations: ["tasks"]
      });
    },
    user: (parent, args, {}, info) => {
      return getRepository(User).findOne({
        where: {
          id: args.id
        },
        relations: ["tasks"]
      });
    },
    tasks: (parent, args, {}, info) => {
      return getRepository(Task).find({
        relations: ["user"]
      });
    },
    task: (parent, args, {}, info) => {
      return getRepository(Task).findOne({
        where: {
          id: args.id
        },
        relations: ["user"]
      });
    }
  },
  Mutation: {
    addUser: (parent, args, {}, info) => {
      const { firstName, lastName, age } = args.input;
      const id = args.id
      return getRepository(User).save({
        id,
        firstName,
        lastName,
        age
      });
    },
    updateUser: (parent, { id, firstName, lastName, age }, {}, info) => {
      return getRepository(User).update(id, {
        firstName,
        lastName,
        age
      });
    },
    addTask: (parent, { id, title, userId }, {}, info) => {
      return getRepository(Task).save({
        id,
        title,
        user: userId
      });
    }
  }
};
