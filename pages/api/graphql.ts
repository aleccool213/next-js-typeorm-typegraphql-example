// Polyfill needed for type-graphql
import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./lib/features/user/user.resolver";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema = await buildSchema({
  resolvers: [UserResolver],
});

const apolloServer = new ApolloServer({ schema });

export default apolloServer.createHandler({ path: "/api/graphql" });
