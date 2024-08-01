import { Request, Response, NextFunction } from "express";

const dateReservation = async(req: Request, res:Response, next:NextFunction) => {
    const { date, time } = req.body;
    const fecha = new Date(date);
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (fecha < tomorrow) {
        return res.status(400).json("Puedes agendar una cita apartir de maniana")
    }
    
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);

    if (fecha > twoWeeksLater) {
        return res.status(400).json("Puedes agendar una cita dentro de las 2 proximas semanas")
    }

    const dayOfWeek = fecha.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return res.status(400).json("tiene que ser un dia habil");
    }


    const [hours, minutes] = time.split(':').map(Number);

    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);

    const workStartTime = new Date(date);
    workStartTime.setHours(9, 0, 0, 0); // 9:00 AM

    const workEndTime = new Date(date);
    workEndTime.setHours(19, 0, 0, 0); // 7:00 PM

    if (startTime < workStartTime || startTime >= workEndTime) {
        return res.status(400).json("el horario disponible es de 9am a 7pm");
    }
   next();
};

export default dateReservation;


