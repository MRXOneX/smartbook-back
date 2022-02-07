import { ApiProperty } from "@nestjs/swagger"


export class CreateUserDto {


    @ApiProperty({example: 'Misha', description: 'firstname'})
    readonly firstname: string;

    @ApiProperty({example: 'Smith', description: 'lastname'})
    readonly lastname: string;

    @ApiProperty({example: 'Yurievich', description: 'middlename'})
    readonly middlename: string;

    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'password'})
    readonly password: string;

    @ApiProperty({example: '21.02.2001', description: 'date of birth'})
    readonly dataOfBirth: string;

    @ApiProperty({example: 'Man or Woman', description: 'sex'})
    readonly sex: string;
}