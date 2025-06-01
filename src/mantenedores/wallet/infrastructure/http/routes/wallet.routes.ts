import { Router } from 'express';
import { WalletController } from '../controller/wallet.controller';
import asyncHandler from '../../../../../utils/asyncHandler';


const router = Router();
const walletController = new WalletController();

/**
 * @route GET /wallet
 * @description Obtiene los detalles de un wallet por su ID.
 */
router.get('/wallet/:id', asyncHandler(walletController.findOne));
router.get('/wallet-cliente/:id', asyncHandler(walletController.findOneCW));
router.get('/wallet', asyncHandler(walletController.getAll));
router.post('/wallet', asyncHandler(walletController.create));
router.put('/wallet/:id', asyncHandler(walletController.update));
router.delete('/wallet/:id', asyncHandler(walletController.delete));

export default router;
