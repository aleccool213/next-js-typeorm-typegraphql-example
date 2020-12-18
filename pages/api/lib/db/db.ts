import * as TypeORM from "typeorm";

import { User } from "../features/user";

let databaseConnection: TypeORM.Connection;

const dbConfig = {
  url: process.env.MONGO_DB_URL,
};

export const createConnection = async (): Promise<TypeORM.Connection> => {
  if (databaseConnection) {
    return databaseConnection;
  }
  // create TypeORM connection
  try {
    databaseConnection = await TypeORM.createConnection({
      type: "mongodb",
      url: dbConfig.url,
      useNewUrlParser: true,
      w: "majority",
      ssl: true,
      authSource: "admin",
      entities: [User],
      logging: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(
      "Could not create a connection with the database, check settings!",
      e
    );
    throw e;
  }
  if (!databaseConnection) {
    throw new Error("database connection still does not exist!");
  }
  return databaseConnection;
};
