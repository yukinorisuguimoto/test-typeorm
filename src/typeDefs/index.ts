import { gql } from 'apollo-server-express'

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
  input UserPaginate {
    skip: Int!,
    take: Int!
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
    users(orderBy: UserOrderBy, paginate: UserPaginate): [User]
    user(id: ID!): User
    tasks: [Task]
    task(id: ID!): Task
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
