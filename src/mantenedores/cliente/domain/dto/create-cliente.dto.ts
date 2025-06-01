import { FormDate, IsExist, IsNull, IsNullOrType } from "@common/validators";

export class CreateClienteDto {
    @IsExist()
    @IsNull()
    id?: number | null;
    
    documento: string;
    nombres: string;
    apellidos: string;
    email: string;
    celular: string;

    @IsExist()
    @IsNullOrType(['string'])
    @FormDate()
    created_at: Date; // The date is received as an ISO string
}