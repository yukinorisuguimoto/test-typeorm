import { gql } from 'apollo-server-express'
const { PubSub } = require('apollo-server-express');
import { getRepository } from "typeorm";
import { User } from "./entity/User";
import { Task } from "./entity/Task";

const pubsub = new PubSub();

export const typeDefs = gql`
  type User {
    id: ID!,
    firstName: String!,
    lastName: String!,
    age: Int!,
    tasks: [Task]
  }
  input UserInput {
    firstName: String!,
    lastName: String!,
    age: Int!
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
    addUser(id: Int, input: UserInput!): User
    updateUser(id: Int!, firstName: String!, lastName: String!, age: Int!): User
    addTask(id: Int, title: String!, userId: Int!): Task
  }
  type Subscription {
    userAdded: User
  }
`;

const USER_ADDED = 'USER_ADDED';


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
    addUser: (parent, args, {}, info) => {
      const {id, firstName, lastName, age} = args.input;
      pubsub.publish(USER_ADDED, { userAdded: args });

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
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator([USER_ADDED]),

    }
  }
};
