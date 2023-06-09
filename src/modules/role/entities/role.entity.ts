import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class Role {

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
        maxLength: 40,
        uniqueItems: true,
        type: 'string'
    })
    @Column('varchar', {
        nullable: false,
        unique: true,
        length: 40
    })
    name: string;

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
