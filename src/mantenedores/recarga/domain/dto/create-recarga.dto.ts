import { FormDate, IsExist, IsNull, IsNullOrType } from "@common/validators";

export class CreateRecargaDto {
    @IsExist()
    @IsNull()
    id?: number | null;

    id_cliente: number;
    valor: number;

    @IsExist()
    @IsNullOrType(['string'])
    @FormDate()
    fecha: Date; // The date is received as an ISO string
}