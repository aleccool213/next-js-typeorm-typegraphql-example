import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { UserService } from "../../services/user/user.service";

import { UserNotFoundError } from "./user.error";
import { User } from "./user.type";

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @Authorized()
  async recipe(@Arg("id") id: string) {
    const recipe = await this.userService.findById(id);
    if (recipe === undefined) {
      throw new UserNotFoundError(id);
    }
    return recipe;
  }
}
