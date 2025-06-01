import { Request, Response } from 'express';
import { PagoService } from '../../../application/services/pago.service';

export class PagoController {
    private sv: PagoService;

    constructor(

    ) {
        this.sv = new PagoService();
    }

    findOne = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.findOne(id);
        res.json(response);
    };

    getAllByIdCliente = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.getAllByIdCliente(id);
        res.json(response);
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        const response = await this.sv.getAll();
        res.json(response);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const clienteData = req.body;
        const response = await this.sv.create(clienteData);
        res.status(201).json(response);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const clienteData = req.body;
        const response = await this.sv.update(id, clienteData);
        res.json(response);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.sv.remove(id);
        res.json(response);
    };
}
