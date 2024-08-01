import { Request, Response } from "express";
import { cancelledAppointmentService, createAppointmentService, getAppointmentByIdService, getAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import { findByIdUserService } from "../services/userService";
import { User } from "../entities/User";

export const getAppointments = async(req: Request, res:Response) => {
    try {
        const appointments: Appointment[] = await getAppointmentService();
        res.status(200).json(appointments);
    } catch (error : any) {
        res.status(404).json({message: error.message});
    }
};

export const getAppointmentById = async(req: Request<{id:string},{},{}>, res: Response) => {
    const {id} = req.params;
    try {
        const appointment: Appointment | null = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(404).json({message: error.message});
    }
}

export const createAppointment = async(req: Request, res: Response) => {
    const {description, date, time, userId} = req.body;
    try {
        const newAppointment: Appointment = await createAppointmentService({description, date,time, userId});
        res.status(201).json(newAppointment);
    }
    catch (error:any) {
        res.status(400).json({message: error.message});
    }
};    

export const changeStatus = async(req: Request<{id :string},{},{}>, res: Response) => {
    const{id} = req.params;
    try {
        const appointmentOff :Appointment | null = await cancelledAppointmentService(Number(id));        
        res.status(200).json(appointmentOff);
    } catch (error : any) {
        res.status(404).json({message: error.message});
    }
};