import { FormDate } from "@common/validators";

export enum PagoEstado {
    PENDIENTE = 'pendiente',
    CONFIRMADO = 'confirmado',
    FALLIDO = 'fallido',
}

export class PagoResponse {
    id: number;
    id_cliente!: number;
    valor!: number;
    estado!: PagoEstado;
    token!: string;
    sessionId!: string;

    @FormDate()
    created_at!: Date;

    @FormDate()
    confirmed_at?: Date | null;

}