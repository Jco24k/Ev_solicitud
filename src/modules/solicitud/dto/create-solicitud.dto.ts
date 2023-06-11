
import { ApiProperty } from "@nestjs/swagger";
import { Country } from "../interfaces/contry.enum";
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class CreateSolicitudDto {

    @ApiProperty({
        maxLength: 30,
        type: 'string'
    })
    @IsIn(Object.values(Country), { message: 'Country is not valid"' })
    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    country: Country

    @ApiProperty({
        maxLength: 60,
        type: 'string'
    })
    @MaxLength(60)
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({
        type: 'decimal',
        nullable: false
    })
    @IsNumber()
    mapX: number

    @ApiProperty({
        type: 'decimal',
        nullable: false,
    })
    @IsNumber()
    mapY: number

    @ApiProperty({
        type: 'int',
        nullable: false,
    })
    @IsNumber()
    mapZoom: number

    @ApiProperty({
        maxLength: 150,
        type: 'string',
        nullable: true
    })
    @IsOptional()
    @IsString()
    observation: string | null

    @ApiProperty({
        default: true,
        nullable: false
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

}



