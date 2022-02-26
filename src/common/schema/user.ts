import {
  IsArray,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(1, {
    message: "用户名不能为空",
  })
  name: string;

  @IsString()
  @MinLength(1, {
    message: "邮箱不能为空",
  })
  @IsEmail({}, { message: "邮箱格式错误" })
  email: string;

  @IsString()
  @MinLength(8, { message: "密码至少 8 个字符" })
  @MaxLength(30, { message: "密码最长 30 个字符" })
  password: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true, message: "标签名不能为空" })
  @MaxLength(10, { each: true, message: "标签名最长 10 个字符" })
  tags: string[];
}

export class CreateUserDtoWithConfirm extends CreateUserDto {
  confirm: string;
}
