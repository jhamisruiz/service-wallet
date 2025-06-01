import express from 'express';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler';
import { config } from './config';
import clienteRoutes from './mantenedores/cliente/infrastructure/http/routes/cliente.routes';
import { AppDataSource } from './config/connection';
import { typeOrmErrorHandler } from './middlewares/typeOrmErrorHandler';
import { responseFormatter } from './middlewares/responseFormatter';
import pagoRoutes from './mantenedores/pago/infrastructure/http/routes/pago.routes';
import recargaRoutes from './mantenedores/recarga/infrastructure/http/routes/recarga.routes';
import walletRoutes from './mantenedores/wallet/infrastructure/http/routes/wallet.routes';


const app = express();

// Middlewares globales
app.use(express.json());
app.use(responseFormatter);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] PATH: ${req.method} ${req.originalUrl}`);
    next(); // Continúa con la siguiente función de middleware o ruta
});

// Initialize TypeORM Data Source
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Aquí irían todas las rutas de los diferentes servicios orquestados por el BOSS
        app.use('/v1', clienteRoutes);
        app.use('/v1', pagoRoutes);
        app.use('/v1', recargaRoutes);
        app.use('/v1', walletRoutes);

        // Ruta de prueba inicial
        app.get('/', (req, res) => {
            res.status(200).json({
                success: true,
                code: '200',
                message: `Virtual Wallet Service está en línea. Entorno: ${config.nodeEnv}`,
                data: null,
            });
        });

        // Middlewares de manejo de errores
        app.use(typeOrmErrorHandler); // Para manejar errores de TypeORM
        app.use(notFoundHandler); // Para rutas no encontradas
        app.use(errorHandler);    // Para manejar errores en la aplicación
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));
    
export default app;
