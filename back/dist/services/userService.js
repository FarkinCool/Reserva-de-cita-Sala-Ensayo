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
exports.findByIdUserService = exports.getUserService = exports.createUserService = void 0;
const credentialService_1 = require("../services/credentialService");
const users = [
    {
        id: 1,
        name: "juan perez",
        email: "jperez@mail.com",
        birthdate: "15-05-2000",
        dDni: "78945612",
        credentialsId: 1,
        status: true
    },
    {
        id: 2,
        name: "luis suarez",
        email: "lsuarez@mail.com",
        birthdate: "01-11-1998",
        dDni: "09045781",
        credentialsId: 2,
        status: true
    }
];
const id = users.length + 1;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, dDni, username, password } = userData;
    let newIdCrendential = yield (0, credentialService_1.newCredentialService)(userData.username, userData.password);
    const newUser = {
        id: id,
        name: name,
        email: email,
        birthdate: birthdate,
        dDni: dDni,
        credentialsId: newIdCrendential,
        status: true
    };
    users.push(newUser);
    return newUser;
});
exports.createUserService = createUserService;
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    return users;
});
exports.getUserService = getUserService;
const findByIdUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFind = users.findIndex(ele => ele.id === id);
    return users[userFind];
});
exports.findByIdUserService = findByIdUserService;
