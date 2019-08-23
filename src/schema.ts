import { gql } from 'apollo-server-express'
import { getRepository } from "typeorm";
import { User } from "./entity/User";
import { Task } from "./entity/Task";

export const typeDefs = gql`
  type User {
    id: ID!,
    firstName: String!,
    lastName: String!,
    age: Int!,
    tasks: [Task]
  }
  enum UserOrderBy {
    firstName_ASC
    firstName_DESC
    lastName_ASC
    lastName_DESC
    age_ASC
    age_DESC
    id_ASC
    id_DESC
  }
  type Task {
    id: ID!,
    title: String!
    user: User!
  }
  type Query {
    hello: String,
    users(orderBy: UserOrderBy): [User]
    user(id: ID!): User
  }
  type Mutation {
    addUser(id: Int, firstName: String!, lastName: String!, age: Int!): User
    updateUser(id: Int!, firstName: String!, lastName: String!, age: Int!): User
    addTask(id: Int, title: String!, userId: Int!): Task
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    users: (parent, args, {parseOrderBy}, info) => {
      return getRepository(User).find({
        order: parseOrderBy(args),
        relations: ["tasks"]
      });
    }
  },
  Mutation: {
    addUser: (parent, {id, firstName, lastName, age}, {}, info) => {
      return getRepository(User).save({
        id,
        firstName,
        lastName,
        age
      });
    },
    updateUser: (parent, {id, firstName, lastName, age}, {}, info) => {
      return getRepository(User).update(id, {
        firstName,
        lastName,
        age
      });
    },
    addTask: (parent, {id, title, userId}, {}, info) => {
      return getRepository(Task).save({
        id,
        title,
        user: userId
      });
    },
  }
};
