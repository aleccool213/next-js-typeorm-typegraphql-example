import { defaultFieldResolver } from "graphql";
import { getRepository } from "typeorm";

import { User } from "../features/user/user.type";

export async function seedDatabase() {
  const userRepository = getRepository(User);

  let defaultUser = await userRepository.findOne({
    name: "Alec Brunelle",
    email: "alec@alec.coffee",
  });
  if (!defaultUser) {
    defaultUser = userRepository.create({
      name: "Alec Brunelle",
      email: "alec@alec.coffee",
    });
    await userRepository.save(defaultUser);
  }
  console.log("Seeded database!");

  return {
    defaultUser,
  };
}
