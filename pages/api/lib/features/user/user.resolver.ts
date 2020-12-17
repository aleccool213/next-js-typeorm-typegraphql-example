import { Arg, Query, Resolver } from "type-graphql";

import { createConnection } from "../../db/db";
import { User } from "./user.type";

@Resolver(() => User)
export class UserResolver {
  constructor() {}

  @Query(() => User)
  async user(@Arg("email") email: string): Promise<User> {
    const connection = await createConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new Error(`Could not find user with email: ${email}`);
    }
    return user;
  }
}
