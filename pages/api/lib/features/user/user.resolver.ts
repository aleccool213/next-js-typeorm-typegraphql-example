import { Arg, Query, Resolver } from "type-graphql";

import { UserService } from "../../services/user/user.service";

import { UserNotFoundError } from "./user.error";
import { User } from "./user.type";

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Arg("id") id: string) {
    return Promise.resolve({
      id,
      name: "Nextjs",
    });
    // const user = await this.userService.findById(id);
    // if (user === undefined) {
    //   throw new UserNotFoundError(id);
    // }
    // return user;
  }
}
