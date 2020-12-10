import { ApolloServer, gql } from "apollo-server-micro";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./lib/features/user/user.resolver";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  apolloServer.createHandler({ path: "/api/graphql" });
};
