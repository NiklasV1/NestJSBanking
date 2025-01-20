import { Customer } from "src/customer/entities/customer.entity";
import { Deposit } from "src/deposit/entities/deposit.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { Withdrawal } from "src/withdrawal/entities/withdrawal.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        })
    owner: Customer

    @Column({nullable: false, length: 100})
    name: string

    @Column({nullable: false, default: 0.00})
    balance: number

    @Column({nullable: false, default: false})
    frozen: boolean

    @OneToMany(()=> Transaction, (transaction)=>transaction.sender)
    sent_transactions: Transaction[]
    
    @OneToMany(()=> Transaction, (transaction)=>transaction.receiver)
    received_transactions: Transaction[]

    @OneToMany(()=> Deposit, (deposit)=>deposit.account)
    deposits: Deposit[]
    
    @OneToMany(()=> Withdrawal, (withdrawal)=>withdrawal.account)
    withdrawals: Withdrawal[]
}
