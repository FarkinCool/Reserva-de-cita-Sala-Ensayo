"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
// GET /turns => obtener todos los turnos
// get /turns/:id => obtener un turno por ID
//post  /turns/schedule => crear un nuevo turno
//put    /turns/cancel => cancelar un turno
const appointementRouter = (0, express_1.Router)();
appointementRouter.get("/", appointmentsController_1.getAppointments);
appointementRouter.get("/:id", appointmentsController_1.getAppointmentById);
appointementRouter.post("/schedule", appointmentsController_1.createAppointment);
appointementRouter.put("/cancel/:id", appointmentsController_1.changeStatus);
exports.default = appointementRouter;
