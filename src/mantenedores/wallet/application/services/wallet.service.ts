import { compareTO, deleteValue } from "@common/functions";
import { CreateWalletDto } from "../../domain/dto/create-wallet.dto";
import { UpdateWalletDto } from "../../domain/dto/update-wallet.dto";
import { Wallet } from "../../domain/entity/wallet.entity";
import { WalletResponse } from "../../domain/interface/wallet.interface";
import { mapWalletEntityToResponse,
    mapWalletToDTO, mapCreateWalletToEntity, 
    mapUpdateWalletDtoToEntity
} from "../../domain/mapping/Wallet.mapping";
import { WalletRepository } from "../../infrastructure/database/wallet.repository";
import { CustomHttpException } from "@common/exceptions";
import { HttpStatus } from "@common/functions/HttpStatus";


export class WalletService {
    private repo: WalletRepository;
    constructor() {
        this.repo = new WalletRepository();
    }

    async findOne(id: number): Promise<WalletResponse | null> {
        const wallet: Wallet = await this.repo.findOne(id);
        if (!wallet) throw new CustomHttpException(`El Wallet con id ${id} no existe!`, HttpStatus.ACCEPTED);
        
        return mapWalletEntityToResponse(wallet);
    }

    async findOneCW(id: number): Promise<any> {
        const wallet: any = await this.repo.findOneCW(id);

        return wallet;
    }

    async getAll(): Promise<WalletResponse[]> {
        const wallet: Wallet[] = await this.repo.getAll();

        return mapWalletToDTO(wallet);
    }

    async create(data: CreateWalletDto): Promise<WalletResponse> {
        const wallet = mapCreateWalletToEntity(data);

        const lastInsertId: number = await this.repo.create(wallet);

        return await this.findOne(lastInsertId);
    }

    async update(id: number, walletDto: UpdateWalletDto) {
        const wallet = await this.findOne(id);

        compareTO(
            wallet,
            walletDto
        );

        return this.repo.update(id, mapUpdateWalletDtoToEntity(walletDto));

      }

    async remove(id: number) {
        const wallet = await this.findOne(id);
        const response = await this.repo.remove(wallet.id);
        deleteValue(response);
        return response;
      }
}