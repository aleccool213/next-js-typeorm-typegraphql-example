import { Connection, getRepository } from "typeorm";

import { User } from "./user.type";

export const UserFactory = {
  build: (connection: Connection, attrs: Partial<User> = {}) => {
    const userAttrs: Partial<User> = {
      email: "alec@alec.coffee",
      ...attrs,
    };

    return getRepository(User).create(userAttrs);
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

  let defaultUser = await userRepository.findOne({
    email: "alec@alec.coffee",
  });
  if (!defaultUser) {
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
