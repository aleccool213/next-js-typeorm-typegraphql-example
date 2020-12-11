// Polyfill needed for type-graphql
import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { IncomingMessage, ServerResponse } from "http";

import { UserResolver } from "./lib/features/user";

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: (req: any, res: any) => Promise<void>;

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
