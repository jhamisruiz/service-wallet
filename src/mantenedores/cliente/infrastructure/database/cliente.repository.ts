import { AppDataSource } from "../../../../config/connection";
import { Cliente } from "../../domain/entity/cliente.entity";

export class ClienteRepository {
  private repo = AppDataSource.getRepository(Cliente);
  constructor() { }

  async findOne(id: number): Promise<Cliente> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async getAll(): Promise<Cliente[]> {
    return await this.repo.find();
  }

  async create(cliente: Cliente): Promise<number> {
    const savedCliente = await this.repo.save({ ...cliente });
    return savedCliente.id;
  }

  async update(id: number, updateData: Cliente) {
    const response = await this.repo.update(id, updateData);

    return { ...response, data: updateData };
  }

  async remove(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}
