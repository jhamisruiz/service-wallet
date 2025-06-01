import { Request, Response, NextFunction } from 'express';
import { StandardResponse } from 'src/interfaces/common.interface';

/**
 * Middleware to format successful API responses into a standardized envelope.
 * It wraps the original data sent via res.json() into the desired success format.
 */
export const responseFormatter = (req: Request, res: Response, next: NextFunction): void => {
    // Store the original res.json function
    const originalJson = res.json;

    // Override res.json to wrap the data
    res.json = function (data: any): Response {
        // If the response is already in a StandardResponse format (e.g., from an error handler),
        // or if it's explicitly null/undefined, send it as is.
        // This prevents double-wrapping or formatting errors.
        if (data === null || data === undefined || (data.success !== undefined && data.error !== undefined)) {
            return originalJson.call(this, data);
        }

        // Determine the message. If the data object itself has a 'message' property, use it.
        // Otherwise, set it to null as per your desired format.
        const message = data && typeof data === 'object' && 'message' in data ? data.message : null;
        // Extract data, removing the 'message' if it was part of the original data object
        const actualData = data && typeof data === 'object' && 'message' in data ? (({ message, ...rest }) => rest)(data) : data;

        const formattedResponse: StandardResponse<any> = {
            success: true,
            error: false,
            // You can dynamically get the status code, or hardcode '200' for success
            code: String(res.statusCode || 200), // Use the status code set by res.status()
            message: message, // Can be null or a specific message from the original data
            data: actualData, // The actual response data
        };

        // Call the original res.json with the formatted response
        return originalJson.call(this, formattedResponse);
    };

    next(); // Move to the next middleware or route handler
};