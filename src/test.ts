import { CreateUserDto } from "./common/schema/user";
import { userService } from "./controller/user";

class JustForTest {
  async createUser(createUserDto: CreateUserDto) {
    const res = await userService.createUser(createUserDto);
    console.log(res);
  }
}

export const justForTest = new JustForTest();
