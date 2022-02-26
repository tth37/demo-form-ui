import { isNotEmptyObject } from "class-validator";
import { ErrorsType, ServiceResponse } from "../common/schema/service";
import { CreateUserDto, CreateUserDtoWithConfirm } from "../common/schema/user";
import { createPostRequest } from "../common/utils/api";
import { createValidator } from "../common/utils/validator";

const fetchCreateUser = createPostRequest<CreateUserDto, any>(
  "/user/createUser"
);

const validateCreateUserDto = createValidator(CreateUserDto);

export class CreateUserDtoWithConfirmErrors extends ErrorsType {
  name?: string[];
  email?: string[];
  password?: string[];
  confirm?: string[];
  tags?: string[];
}

export class UserServiceResponse extends ServiceResponse {
  errors: CreateUserDtoWithConfirmErrors;
}

class UserService {
  async createUser(
    createUserDtoWithConfirm: CreateUserDtoWithConfirm
  ): Promise<UserServiceResponse> {
    const { confirm, ...createUserDto } = createUserDtoWithConfirm;

    const errors = await validateCreateUserDto(createUserDto);
    if (confirm !== createUserDto.password) errors["confirm"] = ["密码不一致"];
    if (isNotEmptyObject(errors)) return { status: "rejected", errors };

    const res = await fetchCreateUser(createUserDto);
    console.log(res);
    if (res.status === "success") return { status: "resolved", errors: {} };
    if (res.status === "badrequest")
      return {
        status: "rejected",
        errors: (res.errorMessage as ErrorsType) || {},
      };

    return { status: "unknownerror", errors: {} };
  }
}

export const userService = new UserService();
