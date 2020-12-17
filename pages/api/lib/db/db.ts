import * as TypeORM from "typeorm";

import { User } from "../features/user";

let databaseConnection: TypeORM.Connection;

export const createConnection = async (): Promise<TypeORM.Connection> => {
  if (databaseConnection) {
    return databaseConnection;
  }
  // create TypeORM connection
  try {
    databaseConnection = await TypeORM.createConnection({
      name: "api-startup",
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
  if (!databaseConnection) {
    throw new Error("database connection still does not exist!");
  }
  return databaseConnection;
};
