import { IsNumber } from '@common/validators';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends CreateClienteDto {
    @IsNumber({ min: 1 })
    id: number;

}