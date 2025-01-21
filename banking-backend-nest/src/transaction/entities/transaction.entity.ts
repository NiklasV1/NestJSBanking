import { Account } from "src/account/entities/account.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 100 })
    message: string

    @Column({ nullable: false })
    amount: number

    @ManyToOne(
        () => Account,
        (account) => account.sent_transactions,
        {
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            cascade: true,
        })
    @JoinColumn({ name: 'sender' })
    sender: Account

    @ManyToOne(
        () => Account,
        (account) => account.received_transactions,
        {
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            cascade: true,
        })
    @JoinColumn({ name: 'receiver' })
    receiver: Account

    @CreateDateColumn({ name: 'timestamp' })
    timestamp: Date
}
