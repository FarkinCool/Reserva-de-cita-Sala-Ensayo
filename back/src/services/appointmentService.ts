import IAppointmentData from "../dtos/IAppointment";
import IAppointment from "../dtos/IAppointment"
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

export const getAppointmentService = async(): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentRepository.find();
    return appointments;
}

export const getAppointmentByIdService = async(id:number):Promise<Appointment | null>  => {
    const appointmentFind: Appointment | null =  await AppointmentRepository.findOne({
        where:{id},
        relations: ["user"]
    });
    if(!appointmentFind) throw new Error("user not found");
    return appointmentFind;
}

export const createAppointmentService = async(appointmentData:IAppointmentData): Promise<Appointment> => {

    const userFind : User | null= await UserRepository.findOneBy({id: appointmentData.userId});
    if(!userFind) throw Error("User inexistent");
    const newAppointment: Appointment = AppointmentRepository.create(appointmentData);
    await AppointmentRepository.save(newAppointment);
    newAppointment.user = userFind;
    await AppointmentRepository.save(newAppointment);
    return newAppointment;
}

export const cancelledAppointmentService = async(id:number): Promise<Appointment | null> => {

    const appointmentFind:Appointment | null =  await AppointmentRepository.findOneBy({id});
    if(appointmentFind){
        appointmentFind.status = "cancelled";
        await AppointmentRepository.save(appointmentFind);
    }
    return appointmentFind;
}
