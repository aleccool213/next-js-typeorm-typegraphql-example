// Polyfill needed for type-graphql
import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { IncomingMessage, ServerResponse } from "http";
import Container from "typedi";

import { User, UserResolver } from "./lib/features/user";
import { startupDatabase } from "./lib/db";

export interface Context {
  user: User;
}

// register 3rd party IOC container
// TypeORM.useContainer(Container);

startupDatabase();

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: (req: any, res: any) => Promise<void>;

/**
 * Create the Apollo Server.
 */
const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [UserResolver],
    });
    apolloServerHandler = new ApolloServer({ schema }).createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};

export default async (req: IncomingMessage, res: ServerResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};
