"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
// GET /users => obtener todos los usuarios
// GET /users/:id => obtener un usuario por ID
// POST  /users/register => crear un nuevo usuario
//
const userRouter = (0, express_1.Router)();
userRouter.get("/", usersController_1.getUsers);
userRouter.get("/:id", usersController_1.getUserById);
userRouter.post("/register", usersController_1.createUser);
userRouter.post("/login", usersController_1.loginUser);
exports.default = userRouter;
