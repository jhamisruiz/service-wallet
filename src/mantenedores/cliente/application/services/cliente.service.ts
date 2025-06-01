import { compareTO, deleteValue } from "@common/functions";
import { CreateClienteDto } from "../../domain/dto/create-cliente.dto";
import { UpdateClienteDto } from "../../domain/dto/update-cliente.dto";
import { Cliente } from "../../domain/entity/cliente.entity";
import { ClienteResponse } from "../../domain/interface/cliente.interface";
import { mapClienteEntityToResponse,
    mapClienteToDTO, mapCreateClienteToEntity, 
    mapUpdateClienteDtoToEntity
} from "../../domain/mapping/cliente.mapping";
import { ClienteRepository } from "../../infrastructure/database/cliente.repository";
import { CustomHttpException } from "@common/exceptions";
import { HttpStatus } from "@common/functions/HttpStatus";
import { WalletRepository } from "src/mantenedores/wallet/infrastructure/database/wallet.repository";


export class ClienteService {
    private clienteRepository: ClienteRepository;
    private walletRepo: WalletRepository;
    constructor() {
        this.clienteRepository = new ClienteRepository();
        this.walletRepo = new WalletRepository();
    }

    async findOne(id: number): Promise<ClienteResponse | null> {
        const cliente: Cliente = await this.clienteRepository.findOne(id);
        if (!cliente) throw new CustomHttpException(`El Cliente con id ${id} no existe!`, HttpStatus.ACCEPTED);
        
        return mapClienteEntityToResponse(cliente);
    }

    async getAll(): Promise<ClienteResponse[]> {
        const cliente: Cliente[] = await this.clienteRepository.getAll();

        return mapClienteToDTO(cliente);
    }

    async create(data: CreateClienteDto): Promise<ClienteResponse> {
        const cliente = mapCreateClienteToEntity(data);

        const lastInsertId: number = await this.clienteRepository.create(cliente);

        if (lastInsertId){
            await this.walletRepo.create({
                id:null,
                id_cliente: lastInsertId,
                saldo: 0
            });
        }
        return await this.findOne(lastInsertId);
    }

    async update(id: number, clienteDto: UpdateClienteDto) {
        const cliente = await this.findOne(id);

        compareTO(
            cliente,
            clienteDto
        );

        return this.clienteRepository.update(id, mapUpdateClienteDtoToEntity(clienteDto));

      }

    async remove(id: number) {
        const cliente = await this.findOne(id);
        const response = await this.clienteRepository.remove(cliente.id);
        deleteValue(response);
        return response;
      }
}