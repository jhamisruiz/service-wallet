import { plainToClass } from "class-transformer";
import { CreatePagoDto } from "../dto/create-pago.dto";
import { Pago } from "../entity/pago.entity";
import { PagoResponse } from "../interface/pago.interface";
import { UpdatePagoDto } from "../dto/update-pago.dto";

export function mapCreatePagoToEntity(createData: CreatePagoDto): Pago {
    const pago = new Pago();
    Object.assign(pago, createData);
    return {
        ...pago,
    };
}

export function mapUpdatePagoDtoToEntity(updateData: UpdatePagoDto): Pago {
    const pago = new Pago();
    Object.assign(pago, updateData);
    return pago;
}

export function mapPagoToDTO(pago: Pago[]): PagoResponse[] {
    return pago.map((p: Pago) => ({
        id: p.id,
        id_cliente: p.id_cliente,
        valor: p.valor,
        estado: p.estado,
        token: p.token,
        sessionId: p.sessionId,
        created_at: p.created_at,
        confirmed_at: p.confirmed_at,
    }));
}

export function mapPagoDtoToResponse(dataDTO: CreatePagoDto, id: number): PagoResponse {
    const data = plainToClass(PagoResponse, dataDTO);
    return {
        ...data,
        id: id,
    };
}

export function mapPagoEntityToResponse(pago: Pago): PagoResponse {
    
    const data = plainToClass(PagoResponse, pago);
    return {
        ...data,
    };
};
