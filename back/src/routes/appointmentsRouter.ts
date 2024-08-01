import { Router } from "express";
import { getAppointments, getAppointmentById, createAppointment, changeStatus } from "../controllers/appointmentsController";
import dateReservation from "../middlewars/dateReservation";

// GET /turns => obtener todos los turnos
// get /turns/:id => obtener un turno por ID
//post  /turns/schedule => crear un nuevo turno
//put    /turns/cancel => cancelar un turno

const appointementRouter = Router();

appointementRouter.get("/", getAppointments);

appointementRouter.get("/:id", getAppointmentById);

appointementRouter.post("/schedule", createAppointment);

appointementRouter.put("/cancel/:id", changeStatus);

export default appointementRouter;
