import { Router } from 'express';
import asyncHandler from '../../../../../utils/asyncHandler';
import { PagoController } from '../controller/pago.controller';


const router = Router();
const pagoController = new PagoController();

/**
 * @route GET /pago/:id
 * @description Obtiene los detalles de un cliente por su ID.
 */
router.get('/pago/:id', asyncHandler(pagoController.findOne));
router.get('/pago-cliente/:id', asyncHandler(pagoController.getAllByIdCliente));
router.get('/pago', asyncHandler(pagoController.getAll));
router.post('/pago', asyncHandler(pagoController.create));
router.put('/pago/:id', asyncHandler(pagoController.update));
router.delete('/pago/:id', asyncHandler(pagoController.delete));

export default router;
