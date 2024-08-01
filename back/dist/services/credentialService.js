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
exports.checkUserService = exports.newCredentialService = void 0;
const credentials = [
    {
        id: 1,
        username: "jperez",
        password: "123456",
        status: true
    },
    {
        id: 2,
        username: "lsuarez",
        password: "123456",
        status: true
    }
];
let credentialId = credentials.length + 1;
const newCredentialService = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newCrendential = {
        id: credentialId,
        username: user,
        password: password,
        status: true
    };
    credentials.push(newCrendential);
    return newCrendential.id;
});
exports.newCredentialService = newCredentialService;
const checkUserService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const index = credentials.findIndex(ele => ele.username === username);
    if (index && credentials[index + 1].password === password) {
        return credentials[index + 1].id;
    }
    else
        return 0;
});
exports.checkUserService = checkUserService;
