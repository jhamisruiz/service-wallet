import { plainToClass } from "class-transformer";
import { CreateRecargaDto } from "../dto/create-recarga.dto";
import { Recarga } from "../entity/recarga.entity";
import { RecargaResponse } from "../interface/recarga.interface";
import { UpdateRecargaDto } from "../dto/update-recarga.dto";

export function mapCreateRecargaToEntity(createData: CreateRecargaDto): Recarga {
    const recarga = new Recarga();
    Object.assign(recarga, createData);
    return {
        ...recarga,
    };
}

export function mapUpdateRecargaDtoToEntity(updateData: UpdateRecargaDto): Recarga {
    const recarga = new Recarga();
    Object.assign(recarga, updateData);
    return recarga;
}

export function mapRecargaToDTO(recarga: Recarga[]): RecargaResponse[] {
    return recarga.map((r: Recarga) => ({
        id: r.id,
        id_cliente: r.id_cliente,
        valor: r.valor,
        fecha: r.fecha,
        
    }));
}

export function mapRecargaDtoToResponse(dataDTO: CreateRecargaDto, id: number): RecargaResponse {
    const data = plainToClass(RecargaResponse, dataDTO);
    return {
        ...data,
        id: id,
    };
}

export function mapRecargaEntityToResponse(recarga: Recarga): RecargaResponse {
    
    const data = plainToClass(RecargaResponse, recarga);
    return {
        ...data,
    };
};
