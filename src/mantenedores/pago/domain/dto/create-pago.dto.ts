import { FormDate, IsExist, IsNull, IsNullOrType } from "@common/validators";
import { PagoEstado } from "../interface/pago.interface";

export class CreatePagoDto {
    @IsExist()
    @IsNull()
    id?: number | null;

    id_cliente: number;
    valor!: number;
    estado!: PagoEstado;
    token!: string;
    sessionId!: string;

    @IsExist()
    @IsNullOrType(['string'])
    @FormDate()
    created_at!: Date;

    @IsExist()
    @IsNullOrType(['string'])
    @FormDate()
    confirmed_at?: Date | null;
    
}