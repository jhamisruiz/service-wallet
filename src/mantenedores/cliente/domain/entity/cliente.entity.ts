import { Entity, Column } from "typeorm";

@Entity("cliente") 
export class Cliente {
    // decorators
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ type: 'int', name: 'documento' })
    documento!: string;

    @Column({ type: 'varchar', length: 100, name: 'nombres' })
    nombres!: string;

    @Column({ type: 'varchar', length: 100, name: 'apellidos' })
    apellidos!: string;

    @Column({ unique: true, length: 100, name: 'email' })
    email!: string;

    @Column({ type: 'varchar', length: 20, name: 'celular' })
    celular!: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    created_at!: Date;
}