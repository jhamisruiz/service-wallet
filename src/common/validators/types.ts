import { Transform } from 'class-transformer';
import { IsNumberOptions, ValidationArguments, ValidationOptions, 
    ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';


/**
 * Checks if a given value is a real string.
 */
export function IsString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isString', // Cambiado a 'isString' para que coincida con el validador
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value === undefined) {
                        return value !== undefined; // Verifica que el valor no sea undefined
                    }

                    return typeof value === 'string';
                },
                defaultMessage(args: ValidationArguments) {
                    // Verificar el valor de la propiedad
                    const value = (args.object as any)[args.property];

                    if (value === undefined) {
                        return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error si el campo está ausente
                    }

                    return `El valor del parámetro ${args.property} debe ser una cadena de texto.`; // Mensaje de error personalizado
                },
            },
        });
    };
}

/**
 * Checks if a value is a boolean.
 */
export function IsBoolean(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isBoolean', // Cambiado a 'isString' para que coincida con el validador
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value === undefined) {
                        return value !== undefined; // Verifica que el valor no sea undefined
                    }

                    return typeof value === 'boolean';
                },
                defaultMessage(args: ValidationArguments) {
                    // Verificar el valor de la propiedad
                    const value = (args.object as any)[args.property];

                    if (value === undefined) {
                        return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error si el campo está ausente
                    }

                    return `El valor del parámetro ${args.property} debe ser true o false.`; // Mensaje de error personalizado
                },
            },
        });
    };
}

interface isNumberOptions extends IsNumberOptions {
    min?: number;
    max?: number;
}
/**
 * Checks if a value is a number.
 */
export function IsNumber(options?: isNumberOptions, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // Permitir undefined (campo ausente)
                    if (value === undefined) {
                        return value !== undefined; // Verifica que el valor no sea undefined
                    }

                    // Permitir null
                    if (value === null) {
                        return false;
                    }

                    // Validar si es un número
                    const isNumber = typeof value === 'number';

                    if (!isNumber) return false;

                    // Validar  NaN
                    if (!options?.allowNaN && isNaN(value)) {
                        return false; // Si se permite NaN, lo acepta
                    }

                    // Validar si se permite NaN
                    if (options?.allowNaN && isNaN(value)) {
                        return true; // Si se permite NaN, lo acepta
                    }

                    // Validar máximo de decimales permitidos
                    if (options?.maxDecimalPlaces !== undefined) {
                        const decimalPlaces = (value.toString().split('.')[1] || '').length;
                        if (decimalPlaces > options.maxDecimalPlaces) {
                            return false;
                        }
                    }

                    // Validar si se permite infinito
                    if (options?.allowInfinity && !isFinite(value)) {
                        return true; // Si se permite infinito, lo acepta
                    }

                    // Validar valor mínimo
                    if (options?.min !== undefined && value < options.min) {
                        return false; // Falla si el valor es menor que min
                    }

                    // Validar valor máximo
                    if (options?.max !== undefined && value > options.max) {
                        return false; // Falla si el valor es mayor que max
                    }

                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    // Verificar el valor de la propiedad
                    const value = (args.object as any)[args.property];

                    if (value === undefined) {
                        return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error si el campo está ausente
                    }

                    // Si no es un número válido
                    if (typeof value !== 'number') {
                        return `El valor del parámetro ${args.property} debe ser un número`;
                    }

                    // Si se valida un valor inferior a `min`
                    if (options?.min !== undefined && value < options.min) {
                        return `El valor del parámetro ${args.property} no debe ser menor que ${options.min}.`;
                    }

                    // Si se valida un valor superior a `max`
                    if (options?.max !== undefined && value > options.max) {
                        return `El valor del parámetro ${args.property} no debe ser mayor que ${options.max}.`;
                    }

                    // Si se excede el máximo número de decimales permitidos
                    if (options?.maxDecimalPlaces !== undefined) {
                        const decimalPlaces = (value.toString().split('.')[1] || '').length;
                        if (decimalPlaces > options.maxDecimalPlaces) {
                            return `El valor del parámetro ${args.property} no debe tener más de ${options.maxDecimalPlaces} decimales.`;
                        }
                    }

                    return `El valor del parámetro ${args.property} debe ser un número válido.`; // Mensaje de error si no es número
                },
            },
        });
    };
}

/**
 * Checks if a given value is a real string.
 */
export function IsNull(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNull', // Cambiado a 'isString' para que coincida con el validador
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value === undefined) {
                        return value !== undefined; // Verifica que el valor no sea undefined
                    }

                    if (value === null) {
                        return true; // Permitir null
                    }
                },
                defaultMessage(args: ValidationArguments) {
                    // Verificar el valor de la propiedad
                    const value = (args.object as any)[args.property];

                    if (value === undefined) {
                        return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error si el campo está ausente
                    }

                    return `El valor del parámetro ${args.property} debe ser null.`; // Mensaje de error personalizado
                },
            },
        });
    };
}

/**
 * Validador personalizado para transformar de string a number y mantener el número exacto de decimales.
 */
export function ParseBool(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        // Usamos Transform para modificar el valor en la transformación de class-transformer
        Transform(({ value }) => {
            if (typeof value === 'number') {
                return value === 1;
            }
            if (Buffer.isBuffer(value)) {
                return value[0] === 1;
            }
            return value;
        })(object, propertyName);

        // Usamos registerDecorator para agregar validación si es necesario
        registerDecorator({
            name: 'parseBool',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === 'number'; // Verificamos que el valor final sea un número
                },
                defaultMessage(args: ValidationArguments) {
                    return `El valor de ${args.property} debe ser un número válido para convertir a boolean.`;
                },
            },
        });
    };
}
