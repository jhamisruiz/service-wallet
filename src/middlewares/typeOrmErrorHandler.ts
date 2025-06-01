import { Request, Response, NextFunction } from 'express';
import { StandardResponse } from 'src/interfaces/common.interface';
import { QueryFailedError } from 'typeorm';

/**
 * Middleware to handle TypeORM QueryFailedError specifically for MySQL errors.
 * Provides more detailed and user-friendly messages for common database issues.
 */
export const typeOrmErrorHandler = (
    err: Error, // The error object
    req: Request,
    res: Response,
    next: NextFunction // Call this if the error is not handled here
) => {
    // Check if the error is a TypeORM QueryFailedError
    if (err instanceof QueryFailedError) {
        const driverError = err.driverError; // This contains the raw database error details

        console.error('🚨 TypeORM QueryFailedError caught:', err);

        let statusCode: number = 500;
        let errorMessage: string = 'Ocurrió un error inesperado en la base de datos.';
        let details: any;

        // Common MySQL error codes (check your MySQL documentation for full list)
        switch (driverError.code) {
            case 'ER_DUP_ENTRY': // MySQL error for duplicate entry on a unique key
                statusCode = 409; // Conflict
                errorMessage = `El dato que intentas crear ya existe (${driverError.sqlMessage}).`;
                details = driverError.sqlMessage; // More specific MySQL message
                break;
            case 'ER_NO_REFERENCED_ROW_2': // MySQL error for foreign key constraint fails (row doesn't exist)
            case 'ER_NO_REFERENCED_ROW':
                statusCode = 400; // Bad Request (client provided invalid foreign key)
                errorMessage = 'No se puede realizar la operación. Un dato relacionado no existe.';
                details = driverError.sqlMessage;
                break;
            case 'ER_ROW_IS_REFERENCED_2': // MySQL error for foreign key constraint fails (row is referenced)
            case 'ER_ROW_IS_REFERENCED':
                statusCode = 409; // Conflict (cannot delete because it's referenced)
                errorMessage = 'No se puede eliminar el dato porque está siendo utilizado en otra parte.';
                details = driverError.sqlMessage;
                break;
            case 'ER_PARSE_ERROR': // MySQL syntax error in query
            case 'ER_BAD_FIELD_ERROR': // Column not found
                statusCode = 500; // Internal Server Error (usually a bug in your code)
                errorMessage = 'Error en la sintaxis o esquema de la base de datos.';
                details = driverError.sqlMessage;
                break;
            case 'ER_DATA_TOO_LONG': // Data too long for column
                statusCode = 400; // Bad Request
                errorMessage = 'Uno de los valores proporcionados es demasiado largo.';
                details = driverError.sqlMessage;
                break;
            case 'ER_WARN_DATA_OUT_OF_RANGE': // Numeric value out of range
                statusCode = 400; // Bad Request
                errorMessage = 'Uno de los valores numéricos está fuera de rango.';
                details = driverError.sqlMessage;
                break;
            // Add more cases for other MySQL error codes as needed
            default:
                // For any other unhandled QueryFailedError, treat as internal server error
                statusCode = 500;
                errorMessage = 'Error en la base de datos: ' + (driverError.sqlMessage || driverError.message);
                details = err.message; // Use TypeORM's error message as a fallback detail
                break;
        }

        const response: StandardResponse<null> = {
            success: false,
            error: true,
            code: String(statusCode),
            message: errorMessage,
            data: details,
        };

        next(response);
    }

    next(err);
};