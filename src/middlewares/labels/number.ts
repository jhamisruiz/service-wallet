import { z, ZodNumber, ZodSchema, ZodTypeAny } from 'zod';

/* const schema = (label: string) => z.number({
    message: `El ${label.toUpperCase()} debe ser un número`,
}).positive({
    message: `El ${label.toUpperCase()} debe ser un número entero positivo`,
}).min(3, { message: `El ${label.toUpperCase()} debe ser un número de 3`, })
    .max(2, { message: `El ${label.toUpperCase()} debe ser un número de 3`, });

export const isNumber = (label: string) => z.object({
    id: z.preprocess(
        (val) => Number(val),
        schema(label)
    ),
}); */

export class IsNumber {
    private label: string;
    private schema: ZodNumber;

    constructor(label: string) {
        this.label = label;
        this.schema = z.number({
            required_error: `El ${label.toUpperCase()} es requerido`,
            invalid_type_error: `El ${label.toUpperCase()} debe ser un número`,
        });
    }

    positive(message?: string) {
        this.schema = this.schema.positive({
            message: message ?? `El ${this.label.toUpperCase()} debe ser un número entero positivo`,
        });
        return this;
    }

    min(n: number, message?: string) {
        this.schema = this.schema.min(n, {
            message: message ?? `El ${this.label.toUpperCase()} debe ser mínimo ${n}`,
        });
        return this;
    }

    max(n: number, message?: string) {
        this.schema = this.schema.max(n, {
            message: message ?? `El ${this.label.toUpperCase()} debe ser máximo ${n}`,
        });
        return this;
    }

    /* build(): ZodSchema {
        return z.object({
            id: z.preprocess((val) => Number(val), this.schema),
        });
    } */
  }