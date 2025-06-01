import { Router } from 'express';
import { ClienteController } from '../controller/cliente.controller';
import asyncHandler from '../../../../../utils/asyncHandler';


const router = Router();
const clienteController = new ClienteController();

/**
 * @route GET /cliente/:id
 * @description Obtiene los detalles de un cliente por su ID.
 */
router.get('/cliente/:id', asyncHandler(clienteController.findOne));
router.get('/cliente', asyncHandler(clienteController.getAll));
router.post('/cliente', asyncHandler(clienteController.create));
router.put('/cliente/:id', asyncHandler(clienteController.update));
router.delete('/cliente/:id', asyncHandler(clienteController.delete));

export default router;
