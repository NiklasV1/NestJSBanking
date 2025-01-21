import { IsNumber, IsUUID, IsAlphanumeric } from 'class-validator'

export class CreateTransactionDto {

    @IsUUID()
    sender: string

    @IsUUID()
    receiver: string

    @IsAlphanumeric()
    message: string

    @IsNumber()
    amount: number
}
