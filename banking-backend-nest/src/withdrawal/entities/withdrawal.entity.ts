import { Account } from "src/account/entities/account.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Withdrawal {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(
        ()=>Account,
        (account)=>account.withdrawals,
        {
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    @JoinColumn({name: 'account'})
    account: Account

    @Column({nullable: false})
    amount: number

    @CreateDateColumn()
    timestamp: Date
}
