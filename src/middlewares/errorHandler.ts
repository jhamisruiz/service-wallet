import { Request, Response, NextFunction } from 'express';
import { StandardResponse } from '../interfaces/common.interface';
import { config } from '../config';

/**
 * Middleware para el manejo centralizado de errores en la aplicación Express.
 * Captura errores y envía una respuesta estandarizada en formato JSON.
 */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Determina el código de estado HTTP
    const statusCode = err.status || err.statusCode || 500;

    // Construye la respuesta estandarizada
    const response: StandardResponse<null> = {
        success: false,
        error: true,
        code: String(statusCode), // Convierte el código a string para la respuesta estándar
        message: err.message || 'Error interno del servidor',
        data: null,
    };

    // En modo desarrollo, también podrías enviar el stack trace para depuración
    if (config.nodeEnv === 'development') {
        console.error(`Error en la ruta ${req.method} ${req.originalUrl}`);
        // response.stack = err.stack; // Descomentar para incluir stack en desarrollo
    } else {
        console.error(`Error en la ruta ${req.method} ${req.originalUrl}:`, err.message);
    }

    res.status(statusCode).json(response);
};

/**
 * Middleware para manejar rutas no encontradas (404).
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    error.status = 404;
    next(error); // Pasa el error al middleware de manejo de errores
};

