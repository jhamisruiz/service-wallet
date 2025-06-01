import { Entity, Column } from "typeorm";

@Entity("recarga") // This maps to your 'Recarga' table
export class Recarga {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ type: 'int', name: 'id_cliente' })
    id_cliente: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'valor' })
    valor!: number;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    fecha!: Date;
}