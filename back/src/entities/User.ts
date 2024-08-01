import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";
import { CONNREFUSED } from "dns";

@Entity({
    name: "users"
})
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    birthdate!: string;

    @Column()
    dDni!: string;
    
    @Column({default: "active"})
    status!: string;

    @Column()
    image!: string;

    // user 1:1 credential
    @OneToOne(() => Credential)
    @JoinColumn({name: "credentialId"})
    credential!: Credential;

    //user 1:N appointments
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[];
}



