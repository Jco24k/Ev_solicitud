import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({
        type: 'string',
        nullable: false
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: 'string',
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}

