import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/modules/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

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
    email: string;

    @ApiProperty({
        maxLength: 60,
        type: 'string'
    })
    @Column('varchar', {
        nullable: false,
        length: 60
    })
    password: string;

    @ApiProperty({
        maxLength: 40,
        type: 'string'
    })
    @Column('varchar', {
        nullable: false,
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


    @ManyToMany(() => Role,{
        cascade: true,
        eager:true
    })
    @JoinTable({
        name: 'users_roles',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'role_id',
          referencedColumnName: 'id',
        },
      })
    roles: Role[]

}
