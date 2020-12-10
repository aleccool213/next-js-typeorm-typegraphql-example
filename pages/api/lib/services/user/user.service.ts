import { Service } from "typedi";
@Service()
export class UserService {
  public async findById(id: string) {
    return Promise.resolve({
      id,
      name: "Nextjs",
    });
  }
}
