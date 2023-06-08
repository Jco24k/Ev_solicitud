import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateRoleDto {

    
    @ApiProperty({
        nullable: false,
        type: 'string',
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        type: 'boolean',
        default:true
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;


}