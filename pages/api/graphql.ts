import { ApolloServer, IResolvers } from "apollo-server-micro";

import { typeDefs } from "../../lib/schema";

const resolvers: IResolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: "Nextjs" }, { name: "Wow!" }];
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
