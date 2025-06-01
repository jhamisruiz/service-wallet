import { HttpStatusDescriptions } from "@common/constants";
import { HttpStatus } from "@common/functions/HttpStatus";
import { HttpException } from "./HttpException";

export class CustomHttpException extends HttpException {
    constructor(message: string, code: HttpStatus) {
        super(
            {
                success: false,
                error: true,
                message,
                status: HttpStatusDescriptions[code], // El nombre del estado HTTP como texto (por ejemplo, "Accepted", "Not Found")
                code,
                data: null,
            },
            code,
        );
    }
}