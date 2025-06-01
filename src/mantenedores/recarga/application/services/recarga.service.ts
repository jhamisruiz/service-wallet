import { compareTO, deleteValue } from "@common/functions";
import { CreateRecargaDto } from "../../domain/dto/create-recarga.dto";
import { UpdateRecargaDto } from "../../domain/dto/update-recarga.dto";
import { Recarga } from "../../domain/entity/recarga.entity";
import { RecargaResponse } from "../../domain/interface/recarga.interface";
import {
    mapRecargaEntityToResponse,
    mapRecargaToDTO, mapCreateRecargaToEntity,
    mapUpdateRecargaDtoToEntity
} from "../../domain/mapping/recarga.mapping";
import { RecargaRepository } from "../../infrastructure/database/recarga.repository";
import { CustomHttpException } from "@common/exceptions";
import { HttpStatus } from "@common/functions/HttpStatus";
import { WalletRepository } from "src/mantenedores/wallet/infrastructure/database/wallet.repository";


export class RecargaService {
    private repo: RecargaRepository;
    private walletRepo: WalletRepository;
    constructor() {
        this.repo = new RecargaRepository();
        this.walletRepo = new WalletRepository();
    }

    async findOne(id: number): Promise<RecargaResponse | null> {
        const recarga: Recarga = await this.repo.findOne(id);
        if (!recarga) throw new CustomHttpException(`El Recarga con id ${id} no existe!`, HttpStatus.ACCEPTED);

        return mapRecargaEntityToResponse(recarga);
    }

    async getAll(): Promise<RecargaResponse[]> {
        const recarga: Recarga[] = await this.repo.getAll();

        return mapRecargaToDTO(recarga);
    }

    async create(data: CreateRecargaDto): Promise<RecargaResponse> {

        const wallet = await this.walletRepo.findOneCliente(data.id_cliente);
        console.log(data.id_cliente,wallet);
        const nuevoSaldo = Number(wallet.saldo ?? 0) + Number(data.valor ?? 0);
        
        const recarga = mapCreateRecargaToEntity(data);


        const lastInsertId: number = await this.repo.create(recarga);

        if (lastInsertId){
            await this.walletRepo.update(wallet.id, {
                id: wallet.id,
                id_cliente: wallet.id_cliente,
                saldo: nuevoSaldo,
            })
        }

        return await this.findOne(lastInsertId);
    }

    async update(id: number, recargaDto: UpdateRecargaDto) {
        const recarga = await this.findOne(id);

        compareTO(
            recarga,
            recargaDto
        );

        return this.repo.update(id, mapUpdateRecargaDtoToEntity(recargaDto));

    }

    async remove(id: number) {
        const recarga = await this.findOne(id);
        const response = await this.repo.remove(recarga.id);
        deleteValue(response);
        return response;
    }
}