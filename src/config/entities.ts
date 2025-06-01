import { Cliente } from "src/mantenedores/cliente/domain/entity/cliente.entity";
import { Pago } from "src/mantenedores/pago/domain/entity/pago.entity";
import { Recarga } from "src/mantenedores/recarga/domain/entity/recarga.entity";
import { WalletClienteView } from "src/mantenedores/wallet/domain/entity/wallet-view.entity";
import { Wallet } from "src/mantenedores/wallet/domain/entity/wallet.entity";

export const Entities =
    [
        Cliente, 
        Pago,
        Recarga,
        Wallet,
        WalletClienteView,
    ];