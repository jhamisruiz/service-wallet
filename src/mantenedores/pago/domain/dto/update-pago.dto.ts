import { IsNumber } from '@common/validators';
import { CreatePagoDto } from './create-pago.dto';

export class UpdatePagoDto extends CreatePagoDto {
    @IsNumber({ min: 1 })
    id: number;

}