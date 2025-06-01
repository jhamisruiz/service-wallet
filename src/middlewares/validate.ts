import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema  } from 'zod';
import { StandardResponse } from '../interfaces/common.interface';

export const validateParams = (ss: any) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const schema: ZodSchema = z.object({
        id: z.preprocess((val) => Number(val), ss.schema),
    });
    const result = schema.safeParse(req.params);
    if (!result.success) {
        const param: any[] = JSON.parse(result.error.message);
        const response: StandardResponse<null> = {
            success: false,
            error: true,
            code: String(400), // Convierte el código a string para la respuesta estándar
            message: param.map(err => err.message) || 'Error de parámetro',
            data: null,
        };
        res.status(400).json(response);
        return; // evita error de tipo, explícitamente retorna void
    }
    req.params = result.data;
    next();
};