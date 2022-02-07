import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'password'})
    readonly password: string;
}