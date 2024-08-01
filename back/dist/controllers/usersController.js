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
exports.getUserById = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const credentialService_1 = require("../services/credentialService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, dDni, username, password } = req.body;
    const newUser = yield (0, userService_1.createUserService)({ name, email, birthdate, dDni, username, password });
    res.status(201).json(newUser);
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const login = yield (0, credentialService_1.checkUserService)(username, password);
    if (!login) {
        res.status(400).json("los datos son incorrectos");
        return;
    }
    res.status(201).json("usuario logueado");
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getUserService)();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, userService_1.findByIdUserService)(id);
    res.status(200).json(user);
});
exports.getUserById = getUserById;
// export const deleteUser = async(req: Request<{id:number}, {},{}>, res: Response) => {
//     const {id} = req.params;
//     res.status(200).json({message: `el usuario con id ${id} , fue eliminado`});
// }
