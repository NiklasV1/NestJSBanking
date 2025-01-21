import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "../../account/entities/account.entity"

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 100 })
    first_name: string

    @Column({ nullable: false, length: 100 })
    last_name: string

    @Column({ nullable: false, length: 200 })
    address: string

    @Column({ nullable: false, length: 50, unique: true })
    username: string

    @Column({ nullable: false, length: 100 })
    password: string

    @OneToMany(() => Account, (account) => account.owner)
    accounts: Account[]
}
