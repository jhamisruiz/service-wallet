import { Request, Response } from 'express';
import { WalletService } from '../../../application/services/wallet.service';

export class WalletController {
    private sv: WalletService;

    constructor(

    ) {
        this.sv = new WalletService();
    }

    findOne = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.findOne(id);
        res.json(response);
    };

    findOneCW = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.findOneCW(id);
        res.json(response);
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        const response = await this.sv.getAll();
        res.json(response);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const walletData = req.body;
        const response = await this.sv.create(walletData);
        res.status(201).json(response);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const walletData = req.body;
        const response = await this.sv.update(id, walletData);
        res.json(response);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.remove(id);
        res.json(response);
    };
}
