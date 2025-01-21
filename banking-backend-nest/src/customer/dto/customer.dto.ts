export class CustomerDto {
    constructor(
        id: string,
        username: string,
        first_name: string,
        last_name: string,
        address: string,
    ) {
        this.id = id
        this.username=username
        this.first_name=first_name
        this.last_name=last_name
        this.address=address
    }

    id: string
    username: string
    first_name: string
    last_name: string
    address: string
}