import { AppDataSource } from "../../../../config/connection";
import { Pago } from "../../domain/entity/pago.entity";

export class PagoRepository {
  private repo = AppDataSource.getRepository(Pago);
  constructor() { }

  async findOne(id: number): Promise<Pago> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async getAllByIdCliente(id_cliente: number): Promise<Pago[]> {
    return await this.repo.find({
      where: { 
        id_cliente: id_cliente
      },
    });
  }

  async getAll(): Promise<Pago[]> {
    return await this.repo.find();
  }

  async create(pago: Pago): Promise<number> {

    const savedPago = await this.repo.save({ ...pago });
    return savedPago.id;
  }

  async update(id: number, updateData: Pago) {
    const response = await this.repo.update(id, updateData);

    return { ...response, data: updateData };
  }

  async remove(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}
