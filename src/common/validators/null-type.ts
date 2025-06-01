import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

/**
 * @info null o data
 * @param types 'string' | 'number' | 'boolean'
 * @param validationOptions 
 * @returns any
 */
export function IsNullOrType(types: Array<'string' | 'number' | 'boolean'>, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNullOrType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // Permitir undefined (campo ausente)
                    if (value === undefined) {
                        return true; // No falla si se omite el campo
                    }

                    // Permitir null o validar el tipo
                    if (value === null) {
                        return true; // Permitir null
                    }
                    // Verifica si el valor es de uno de los tipos permitidos
                    return types.some(type => {
                        if (type === 'string') {
                            return typeof value === 'string';
                        } else if (type === 'number') {
                            return typeof value === 'number';
                        } else if (type === 'boolean') {
                            return typeof value === 'boolean';
                        }
                        return false; // Si se pasa un tipo no reconocido
                    });
                },
                defaultMessage(args: ValidationArguments) {
                    // Verificar el valor de la propiedad
                    const value = (args.object as any)[args.property];

                    if (value === undefined) {
                        return `El parámetro ${args.property} es obligatorio.`; // Mensaje de error si el campo está ausente
                    }

                    return `El parámetro ${args.property} debe ser null o uno de los tipos permitidos: ${types.join(', ')}.`; // Mensaje de error personalizado si el tipo es incorrecto
                },
            },
        });
    };
}
