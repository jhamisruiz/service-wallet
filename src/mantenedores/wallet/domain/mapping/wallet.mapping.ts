import { plainToClass } from "class-transformer";
import { CreateWalletDto } from "../dto/create-wallet.dto";
import { Wallet } from "../entity/wallet.entity";
import { WalletResponse } from "../interface/wallet.interface";
import { UpdateWalletDto } from "../dto/update-wallet.dto";

export function mapCreateWalletToEntity(createData: CreateWalletDto): Wallet {
    const wallet = new Wallet();
    Object.assign(wallet, createData);
    return {
        ...wallet,
    };
}

export function mapUpdateWalletDtoToEntity(updateData: UpdateWalletDto): Wallet {
    const wallet = new Wallet();
    Object.assign(wallet, updateData);
    return wallet;
}

export function mapWalletToDTO(wallet: Wallet[]): WalletResponse[] {
    return wallet.map((c: Wallet) => ({
        id: c.id,
        id_cliente: c.id_cliente,
        saldo: c.saldo,
    }));
}

export function mapWalletDtoToResponse(dataDTO: CreateWalletDto, id: number): WalletResponse {
    const data = plainToClass(WalletResponse, dataDTO);
    return {
        ...data,
        id: id,
    };
}

export function mapWalletEntityToResponse(wallet: Wallet): WalletResponse {
    
    const data = plainToClass(WalletResponse, wallet);
    return {
        ...data,
    };
};
