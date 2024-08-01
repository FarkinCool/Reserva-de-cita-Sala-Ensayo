"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.createAppointment = exports.getAppointmentById = exports.getAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield (0, appointmentService_1.getAppointmentService)();
    res.status(201).json(appointments);
});
exports.getAppointments = getAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(id);
    res.status(200).json(appointment);
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = req.body;
    const newAppointment = yield (0, appointmentService_1.createAppointmentService)({ date, time, userId });
    res.status(201).json(newAppointment);
});
exports.createAppointment = createAppointment;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointmentOff = yield (0, appointmentService_1.cancelledAppointmentService)(id);
    res.status(201).json(appointmentOff);
});
exports.changeStatus = changeStatus;
