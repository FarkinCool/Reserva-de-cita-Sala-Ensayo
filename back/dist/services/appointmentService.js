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
exports.cancelledAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const appointments = [
    {
        id: 1,
        date: "24-2-2024",
        time: "4hrs",
        userId: 2,
        status: "active"
    },
    {
        id: 2,
        date: "1-6-2024",
        time: "2hrs",
        userId: 1,
        status: "active"
    },
    {
        id: 3,
        date: "10-6-2024",
        time: "6hrs",
        userId: 2,
        status: "active"
    }
];
const newId = appointments.length + 1;
// id: number,
// date:string,
// time: string,
// userId: number,
// status: string // active || cancelled
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    return appointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFind = appointments.findIndex(ele => ele.id === id);
    return appointments[appointmentFind];
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = appointmentData;
    const newAppointment = {
        id: newId,
        date,
        time,
        userId,
        status: "active"
    };
    appointments.push(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelledAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFind = appointments.findIndex(ele => ele.id === id);
    appointments[appointmentFind].status = "cancelled";
    return appointments[appointmentFind];
});
exports.cancelledAppointmentService = cancelledAppointmentService;
