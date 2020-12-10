// Polyfill needed for type-graphql
import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { IncomingMessage, ServerResponse } from "http";

import { UserResolver } from "./lib/features/user/user.resolver";

export const config = {
  api: {
    bodyParser: false,
  },
};

const buildServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  return new ApolloServer({ schema });
};

let server: ApolloServer | null = null;

export default async (req: IncomingMessage, res: ServerResponse) => {
  const apolloServer: ApolloServer = server || (await buildServer());
  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};
