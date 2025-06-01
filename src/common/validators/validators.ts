import { Transform } from 'class-transformer';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ async: false })
export class ExistParam implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        // Verifica que el valor no sea undefined
        return value !== undefined;
    }

    defaultMessage(args: ValidationArguments) {
        return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error personalizado
    }
}


export function IsExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value !== undefined; // Verifica que el valor no sea undefined
                },
                defaultMessage(args: ValidationArguments) {
                    return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error personalizado
                },
            },
        });
    };
}

// Validador personalizado
@ValidatorConstraint({ async: false })
export class TransformDateConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const format = (args.constraints && args.constraints[0]) || 'YYYY-MM-DD HH:mm:ss';
        // Verificamos si la fecha es válida en el formato YYYY-MM-DD HH:mm:ss
        if (value === null) return true;
        return moment(value, format, true).isValid();
    }

    defaultMessage(args: ValidationArguments) {
        const format = (args.constraints && args.constraints[0]) || 'YYYY-MM-DD HH:mm:ss';
        return `El valor de ${args.property} debe tener el formato ${format}`;
    }
}

/**
 * Validador personalizado para transformar de fecha.
 */
export function FormDate(format?: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        // Aplicamos la transformación al formato deseado
        Transform(({ value }) => {
            if (value && value instanceof Date) {
                // Intentamos transformar el valor a una fecha válida en formato YYYY-MM-DD HH:mm:ss
                const parsedDate = moment(value, format ?? 'YYYY-MM-DD HH:mm:ss');
                if (parsedDate.isValid()) {
                    return parsedDate.format(format ?? 'YYYY-MM-DD HH:mm:ss');
                }
            }
            return value;
        })(object, propertyName);

        // Registramos el decorador para la validación personalizada
        registerDecorator({
            name: 'formDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [format],
            validator: TransformDateConstraint,
        });
    };
}