import { IsNumber } from '@common/validators';
import { CreateRecargaDto } from './create-recarga.dto';

export class UpdateRecargaDto extends CreateRecargaDto {
    @IsNumber({ min: 1 })
    id: number;
}