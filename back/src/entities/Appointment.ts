import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "appointments"
})
export class Appointment{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description!: string;

    @Column()
    date!: string;

    @Column()
    time!: string;

    @Column()
    userId!: number;

    @Column({default: "active"})
    status!: string;    /// active || cancelled

    //appointment N:1 user
    @ManyToOne(()=> User, (user) => user.appointments)
    user!: User;
}

