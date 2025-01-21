export class CreateCustomerDto {
    constructor(
        first_name: string,
        last_name: string,
        address: string,
        username: string,
        password: string,
    ) {
        this.first_name = first_name
        this.last_name = last_name
        this.address = address
        this.username = username
        this.password = password
    }

    first_name: string
    last_name: string
    address: string
    username: string
    password: string
}
