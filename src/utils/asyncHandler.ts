import { Request, Response, NextFunction, RequestHandler } from 'express';

// Se puede definir un tipo auxiliar para el manejador asíncrono
type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>; // Promise<void> es el tipo esperado para funciones asíncronas que no devuelven nada explícitamente para Express.

/**
 * Función utilitaria para envolver manejadores de ruta asíncronos.
 * Captura automáticamente las excepciones y las pasa al middleware de manejo de errores.
 * Esto evita la necesidad de usar try/catch en cada manejador asíncrono.
 *
 * @param fn El manejador de ruta asíncrono original. Su retorno esperado es Promise<void>.
 * @returns Un RequestHandler que puede ser usado por Express.
 */
const asyncHandler = (fn: AsyncRequestHandler): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        // Aquí se asegura que la promesa se resuelva (si es Promise<void>) o se capture el error.
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler;