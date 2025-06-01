import { FormDate } from "@common/validators";

export class ClienteResponse {
    id: number;
    documento: string;
    nombres: string;
    apellidos: string;
    email: string;
    celular: string;
    // decorators
    @FormDate()
    created_at: Date;
}