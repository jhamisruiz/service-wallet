import { registerDecorator, ValidationArguments, ValidationOptions, 
    ValidatorConstraint, ValidatorConstraintInterface 
} from 'class-validator';

export function IsArrayTo(type: Function, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsArrayTo',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [type],
            validator: IsArrayToConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'IsArrayTo' })
export class IsArrayToConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [type] = args.constraints;

        if (!Array.isArray(value)) return false; // Verifica si es un arreglo

        // Verifica que cada elemento en el arreglo sea una instancia de la clase especificada
        return value.every((item) => item instanceof type);
    }

    defaultMessage(args: ValidationArguments) {
        const [type] = args.constraints;
        console.log(args.constraints);
        return `Each item in ${args.property} must be an instance of ${type.name}`;
    }
}
