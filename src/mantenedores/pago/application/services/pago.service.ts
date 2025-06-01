import { compareTO, deleteValue } from "@common/functions";
import { CreatePagoDto } from "../../domain/dto/create-pago.dto";
import { UpdatePagoDto } from "../../domain/dto/update-pago.dto";
import { Pago } from "../../domain/entity/pago.entity";
import { PagoResponse } from "../../domain/interface/pago.interface";
import { mapPagoEntityToResponse,
    mapPagoToDTO, mapCreatePagoToEntity,
    mapUpdatePagoDtoToEntity
} from "../../domain/mapping/pago.mapping";
import { CustomHttpException } from "@common/exceptions";
import { HttpStatus } from "@common/functions/HttpStatus";
import { PagoRepository } from "../../infrastructure/database/pago.repository";
import { WalletRepository } from "src/mantenedores/wallet/infrastructure/database/wallet.repository";

export class PagoService 
 {
    private pagoRepository: PagoRepository;
    private walletRepo: WalletRepository;
    constructor() {
        this.pagoRepository = new PagoRepository();
        this.walletRepo = new WalletRepository();
    }

    async findOne(id: number): Promise<PagoResponse | null> {
        const pago: Pago = await this.pagoRepository.findOne(id);
        if (!pago) throw new CustomHttpException(`El Pago con id ${id} no existe!`, HttpStatus.ACCEPTED);
        
        return mapPagoEntityToResponse(pago);
    }

    async getAllByIdCliente(id_cliente: number): Promise<PagoResponse[]> {
        const pago: Pago[] = await this.pagoRepository.getAllByIdCliente(id_cliente);

        return mapPagoToDTO(pago);
    }

    async getAll(): Promise<PagoResponse[]> {
        const pago: Pago[] = await this.pagoRepository.getAll();

        return mapPagoToDTO(pago);
    }

    async create(data: CreatePagoDto): Promise<PagoResponse> {
        const pago = mapCreatePagoToEntity(data);
        const lastInsertId: number = await this.pagoRepository.create(pago);

        return await this.findOne(lastInsertId);
    }

    async update(id: number, pagoDto: UpdatePagoDto) {

        const wallet = await this.walletRepo.findOneCliente(pagoDto.id_cliente);

        const saldo = Number(wallet.saldo ?? 0);
        const valorPago = Number(pagoDto.valor ?? 0);

        if (saldo === 0 || valorPago > saldo) throw new CustomHttpException(`El saldo de la wallet del cliente es insuficiente para realizar el pago`, HttpStatus.PARTIAL_CONTENT);

        const nuevoSaldo = saldo - valorPago;
        if (nuevoSaldo < 0) throw new CustomHttpException(`El saldo de la wallet del cliente es insuficiente para realizar el pago`, HttpStatus.PARTIAL_CONTENT);
        await this.walletRepo.update(wallet.id, {
            id: wallet.id,
            id_cliente: wallet.id_cliente,
            saldo: nuevoSaldo,
        });

        return this.pagoRepository.update(id, mapUpdatePagoDtoToEntity(
            {
                id: pagoDto.id,
                id_cliente: pagoDto.id_cliente,
                valor: pagoDto.valor,
                estado: pagoDto.estado,
                token: pagoDto.token,
                sessionId: pagoDto.sessionId,
                created_at: pagoDto.created_at,
                confirmed_at: pagoDto.confirmed_at,
            }
        ));
      }

    async remove(id: number) {
        const pago = await this.findOne(id);
        const response = await this.pagoRepository.remove(pago.id);
        deleteValue(response);
        return response;
      }
}
