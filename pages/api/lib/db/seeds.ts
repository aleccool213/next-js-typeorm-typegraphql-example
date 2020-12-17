import { createConnection } from "./db";

import { seedDatabase } from "../features/user/user.factory";

const startupDatabase = async () => {
  const databaseConnection = await createConnection();

  await seedDatabase(databaseConnection);

  await databaseConnection.close();
};

startupDatabase();
