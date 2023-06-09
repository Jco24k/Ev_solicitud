import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function UniqueItemArrayPipe(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UniqueItemArrayPipe',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: String[], args: ValidationArguments) {
          const uniqueElements = new Set(value);
          return (uniqueElements.size === value?.length);
        },
      },
    });
  };
}