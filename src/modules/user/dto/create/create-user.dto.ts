import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { UniqueItemArrayPipe } from "../../../../common/validators/unique-item-array.pipe";
import { ICreateUser } from "../interfaces/create-user.interface";

export class CreateUserDto implements ICreateUser{

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
        type: 'array',
        items: { type: 'string', format: 'uuid' }
    })
    @ArrayMinSize(1, { message: 'Roles array must have at least one element' })
    @IsUUID('all', { each: true, message: 'Each role must be a valid UUID' })
    @UniqueItemArrayPipe('roles',{message: 'User "roles" contains duplicate elements'})
    roles: string[];

}
