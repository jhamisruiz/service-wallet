import 'tsconfig-paths/register';
import app from './app';
import { config } from './config'; // Importa la configuración

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Service escuchando en el puerto ${PORT}`);
    console.log(`Entorno de ejecución: ${config.nodeEnv}`);
});
