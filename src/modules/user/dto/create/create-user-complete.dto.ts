import { Role } from "src/modules/role/entities/Role.entity";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Type } from "class-transformer";


export class CreateUserCompleteDto implements Omit<CreateUserDto, 'roles'>{
    

    @ApiProperty({
        maxLength: 40,
        uniqueItems: true,
        type: 'string'
    })
    @IsNotEmpty()
    @MaxLength(40)
    @IsEmail()
    email: string;


    @ApiProperty({
        nullable: false,
        type: 'string',
        maxLength: 60
    })
    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    password: string


    @ApiProperty({
        nullable: false,
        type: 'string',
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string

    @ApiProperty({
        type: 'boolean',
        default: true
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        type: [Role],
        nullable: false
    })
    roles: Role[]

}