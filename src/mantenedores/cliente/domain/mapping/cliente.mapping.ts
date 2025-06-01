import { plainToClass } from "class-transformer";
import { CreateClienteDto } from "../dto/create-cliente.dto";
import { Cliente } from "../entity/cliente.entity";
import { ClienteResponse } from "../interface/cliente.interface";
import { UpdateClienteDto } from "../dto/update-cliente.dto";

export function mapCreateClienteToEntity(createData: CreateClienteDto): Cliente {
    const cliente = new Cliente();
    Object.assign(cliente, createData);
    return {
        ...cliente,
    };
}

export function mapUpdateClienteDtoToEntity(updateData: UpdateClienteDto): Cliente {
    const cliente = new Cliente();
    Object.assign(cliente, updateData);
    return cliente;
}

export function mapClienteToDTO(cliente: Cliente[]): ClienteResponse[] {
    return cliente.map((c: Cliente) => ({
        id: c.id,
        documento: c.documento,
        nombres: c.nombres,
        apellidos: c.apellidos,
        email: c.email,
        celular: c.celular,
        created_at: c.created_at, // Convert Date to ISO string
    }));
}

export function mapClienteDtoToResponse(dataDTO: CreateClienteDto, id: number): ClienteResponse {
    const data = plainToClass(ClienteResponse, dataDTO);
    return {
        ...data,
        id: id,
    };
}

export function mapClienteEntityToResponse(cliente: Cliente): ClienteResponse {
    
    const data = plainToClass(ClienteResponse, cliente);
    return {
        ...data,
    };
};
