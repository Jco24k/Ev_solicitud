import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "../interfaces/contry.enum";


@Entity({ name: 'solicitudes' })
export class Solicitud {

    @ApiProperty({
        maxLength: 36,
        uniqueItems: true,
        type: 'string'
    })
    @Column('varchar', {
        primary: true,
        length: 36
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        maxLength: 10,
        uniqueItems: true,
        type: 'string'
    })
    @Column({
        unique: true,
        length: 10,
        nullable: false,
        default: () => "CONCAT('P', LPAD(nextval('seq_nro_solicitud')::text, 4, '0'))"
    })
    nro_solicitud: string


    @ApiProperty({
        maxLength: 30,
        type: 'string'
    })
    @Column('varchar', {
        length: 30, nullable: false
    })
    country: Country

    @ApiProperty({
        maxLength: 60,
        type: 'string'
    })
    @Column('varchar', {
        length: 60,
        nullable: false
    })
    address: string

    @ApiProperty({
        type: 'decimal',
        nullable: false
    })
    @Column({
        nullable: false,
        name: 'map_x',
        type: 'decimal',
    })
    mapX: number

    @ApiProperty({
        type: 'decimal',
        nullable: false,
    })
    @Column({
        nullable: false,
        name: 'map_y',
        type: 'decimal'
    })
    mapY: number

    @ApiProperty({
        type: 'int',
        nullable: false,
    })
    @Column({
        nullable: false,
        name: 'map_zoom',
        type: 'int'
    })
    mapZoom: number

    @ApiProperty({
        maxLength: 150,
        type: 'string',
        nullable: true
    })
    @Column('varchar', {
        length: 150,
        nullable: true
    })
    observation: string | null

    @ApiProperty({
        default: true,
        nullable: false
    })
    @Column({
        name: 'is_active',
        default: true,
        nullable: false
    })
    isActive: boolean;

}
