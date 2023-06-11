import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Roles } from "src/common/interfaces/roles.enum";

export class CreateRoleDto {

    
    @ApiProperty({
        nullable: false,
        type: 'string',
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    @IsIn(Object.values(Roles), { message: 'Roles is not valid"' })
    name: Roles;


    @ApiProperty({
        type: 'boolean',
        default:true
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;


}