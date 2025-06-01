import { IsExist, IsNull } from "@common/validators";

export class CreateWalletDto {
    @IsExist()
    @IsNull()
    id?: number | null;
    
    id_cliente: number;
    saldo: number;
}