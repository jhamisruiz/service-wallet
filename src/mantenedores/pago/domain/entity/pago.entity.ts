import { Entity, Column } from "typeorm";
import { PagoEstado } from "../interface/pago.interface";

@Entity("pago") // Maps to the 'pago' table
export class Pago {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ type: 'int', name: 'id_cliente' })
    id_cliente: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'valor' })
    valor!: number;

    @Column({
        type: 'enum',
        enum: PagoEstado,
        default: PagoEstado.PENDIENTE,
        nullable: true, 
    })
    estado!: PagoEstado; // Maps to the PagoEstado enum

    @Column({ type: 'varchar', length: 6 })
    token!: string;

    @Column({ type: 'varchar', length: 64, name: 'session_id' })
    sessionId!: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    created_at!: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    confirmed_at?: Date | null;
}