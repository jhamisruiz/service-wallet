import { AppDataSource } from "../../../../config/connection";
import { Recarga } from "../../domain/entity/recarga.entity";

export class RecargaRepository {
  private repo = AppDataSource.getRepository(Recarga);
  constructor() { }

  async findOne(id: number): Promise<Recarga> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async getAll(): Promise<Recarga[]> {
    return await this.repo.find();
  }

  async create(recarga: Recarga): Promise<number> {
    console.log('recarga----------------------------: ', recarga);
    const savedRecarga = await this.repo.save({ ...recarga });
    return savedRecarga.id;
  }

  async update(id: number, updateData: Recarga) {
    const response = await this.repo.update(id, updateData);
    return { ...response, data: updateData };
  }

  async remove(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}
