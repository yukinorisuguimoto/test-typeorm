import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"
import { parseOrderBy, parsePaginate } from "./helpers"


const express = require("express");


// Construct a schema, using GraphQL schema language
const server = new ApolloServer({ typeDefs, resolvers, context: { parseOrderBy, parsePaginate } });
const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

createConnection().then(async connection => {

  // console.log("Inserting a new user into the database...");
  // const user = new User();
  // user.firstName = "Timber";
  // user.lastName = "Saw";
  // user.age = 25;
  // await connection.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
