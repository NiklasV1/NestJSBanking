import { Customer } from "src/customer/entities/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Customer, (customer) => customer.accounts)
    owner: Customer

    @Column({nullable: false, length: 100})
    name: string

    @Column({nullable: false, default: 0.00})
    balance: number

    @Column({nullable: false, default: false})
    frozen: boolean
}
