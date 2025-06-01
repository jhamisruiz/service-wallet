import { Router } from 'express';
import { RecargaController } from '../controller/recarga.controller';
import asyncHandler from '../../../../../utils/asyncHandler';


const router = Router();
const recargaController = new RecargaController();

/**
 * @route GET /recarga/:id
 * @description Obtiene los detalles de un recarga por su ID.
 */
router.get('/recarga/:id', asyncHandler(recargaController.findOne));
router.get('/recarga', asyncHandler(recargaController.getAll));
router.post('/recarga', asyncHandler(recargaController.create));
router.put('/recarga/:id', asyncHandler(recargaController.update));
router.delete('/recarga/:id', asyncHandler(recargaController.delete));

export default router;
