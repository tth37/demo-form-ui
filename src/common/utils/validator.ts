import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ErrorsType } from "../schema/service";

/**
 * @param cls the class to be validated
 * @returns a function which check whether or not the object is valid
 */
export function createValidator<T extends object>(cls: ClassConstructor<T>) {
  return async (obj: T) => {
    const instance = plainToClass(cls, obj);
    const validateResult = await validate(instance);
    const res: ErrorsType = {};
    validateResult.forEach((error: ValidationError) => {
      if (error.constraints)
        res[error.property] = Object.values(error.constraints);
    });
    return res;
  };
}
