import { Request, Response } from 'express';
import { ClienteService } from '../../../application/services/cliente.service';

export class ClienteController {
    private clienteService: ClienteService;

    constructor(

    ) {
        this.clienteService = new ClienteService();
    }

    findOne = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.clienteService.findOne(id);
        res.json(response);
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        const response = await this.clienteService.getAll();
        res.json(response);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const clienteData = req.body;
        const response = await this.clienteService.create(clienteData);
        res.status(201).json(response);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const clienteData = req.body;
        const response = await this.clienteService.update(id, clienteData);
        res.json(response);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const response = await this.clienteService.remove(id);
        res.json(response);
    };
}
