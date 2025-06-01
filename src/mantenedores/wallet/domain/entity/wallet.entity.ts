import { Entity, Column } from "typeorm";

@Entity("wallet") // This maps to your 'Wallet' table
export class Wallet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ type: 'int', name: 'id_cliente' })
    id_cliente: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'saldo' })
    saldo: number;
}