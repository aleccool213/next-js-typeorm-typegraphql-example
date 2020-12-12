// Polyfill needed for type-graphql
import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { IncomingMessage, ServerResponse } from "http";
import * as TypeORM from "typeorm";
import Container from "typedi";

import { User, UserResolver } from "./lib/features/user";
import { seedDatabase } from "./lib/helpers/seeder";

export interface Context {
  user: User;
}

// register 3rd party IOC container
TypeORM.useContainer(Container);

let databaseConnection: TypeORM.Connection;

const startupDatabase = async () => {
  // create TypeORM connection
  try {
    if (databaseConnection) {
      return;
    }
    databaseConnection = await TypeORM.createConnection({
      type: "mongodb",
      database: "calsync",
      port: 27017,
      host: "localhost",
      entities: [User],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(
      "Could not create a connection with the database, check settings!"
    );
    throw e;
  }

  // seed database with some data
  // const { defaultUser } = await seedDatabase();

  // create mocked context
  // const context: Context = { user: defaultUser };

  await seedDatabase();
};

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
