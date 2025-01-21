import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";
import { Transaction } from "../../transaction/entities/transaction.entity";

@Entity()
export class Account {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(
        () => Customer,
        (customer) => customer.accounts,
        {
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            cascade: true,
        })
    @JoinColumn({ name: 'owner' })
    owner: Customer

    @Column({ nullable: false, length: 100 })
    name: string

    @Column({ nullable: false, default: 0.00 })
    balance: number

    @Column({ nullable: false, default: false })
    frozen: boolean

    @OneToMany(() => Transaction, (transaction) => transaction.sender)
    sent_transactions: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.receiver)
    received_transactions: Transaction[]
}
