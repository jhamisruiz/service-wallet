import { Request, Response } from 'express';
import { RecargaService } from '../../../application/services/recarga.service';

export class RecargaController {
    private sv: RecargaService;

    constructor(

    ) {
        this.sv = new RecargaService();
    }

    findOne = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.findOne(id);
        res.json(response);
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        const response = await this.sv.getAll();
        res.json(response);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const recargaData = req.body;
        const response = await this.sv.create(recargaData);
        res.status(201).json(response);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const recargaData = req.body;
        const response = await this.sv.update(id, recargaData);
        res.json(response);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.remove(id);
        res.json(response);
    };
}
