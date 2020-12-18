import { Connection, getRepository } from "typeorm";

import { User } from "./user.type";

export const UserFactory = {
  build: (connection: Connection, attrs: Partial<User> = {}) => {
    const userAttrs: Partial<User> = {
      email: "alec@alec.coffee",
      ...attrs,
    };

    return connection.getRepository(User).create(userAttrs);
  },

  create: async (connection: Connection, attrs: Partial<User> = {}) => {
    const user = UserFactory.build(connection, attrs);
    const createdUser = await connection.getRepository(User).save(user);

    return createdUser;
  },

  deleteAll: async () => {
    await getRepository(User).delete({
      email: "alec@alec.coffee",
    });
  },
};

export async function seedDatabase(connection: Connection) {
  const userRepository = connection.getRepository(User);

  console.log("Finding user...");
  let defaultUser = await userRepository.findOne({
    email: "alec@alec.coffee",
  });
  if (!defaultUser) {
    console.log("Found no user, creating one now...");
    defaultUser = await UserFactory.create(connection, {
      name: "Alec Brunelle",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  console.log("Seeded user in database!");

  return {
    defaultUser,
  };
}
