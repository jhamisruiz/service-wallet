import { AppDataSource } from "../../../../config/connection";
import { WalletClienteView } from "../../domain/entity/wallet-view.entity";
import { Wallet } from "../../domain/entity/wallet.entity";

export class WalletRepository {
  private repo = AppDataSource.getRepository(Wallet);
  private viewRepo = AppDataSource.getRepository(WalletClienteView);

  constructor() { }

  async findOne(id: number): Promise<Wallet> {
    return await this.repo.findOne({
      where: { id },
    });
  }
  async findOneCliente(id_cliente: number): Promise<Wallet> {
    return await this.repo.findOne({
      where: { id_cliente },
    });
  }

  async findOneCW(id: number): Promise<WalletClienteView> {
    return await this.viewRepo.findOne({
      where: { id },
    });
  }

  async getAll(): Promise<Wallet[]> {
    return await this.repo.find();
  }

  async create(wallet: Wallet): Promise<number> {
    //const newWallet = this.repo.create(Wallet);
    const savedWallet = await this.repo.save({ ...wallet });
    return savedWallet.id;
  }

  async update(id: number, updateData: Wallet) {
    const response = await this.repo.update(id, updateData);

    return { ...response, data: updateData };
  }

  async remove(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}
