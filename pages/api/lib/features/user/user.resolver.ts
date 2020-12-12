import { Arg, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "./user.type";

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => User)
  async user(@Arg("id") id: string) {
    // TODO: current error: "message": "Cannot read property 'findOne' of undefined",
    return this.userRepository.findOne(id);
  }
}
