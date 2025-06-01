import { IsNumber } from '@common/validators';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends CreateWalletDto {
    @IsNumber({ min: 1 })
    id: number;

}