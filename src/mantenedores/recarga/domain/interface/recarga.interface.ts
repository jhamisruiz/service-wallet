import { FormDate } from "@common/validators";

export class RecargaResponse {
    id: number;
    id_cliente: number;
    valor!: number;

    @FormDate()
    fecha: Date;
}