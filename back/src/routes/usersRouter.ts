
import { Router } from "express";

import { getUsers, getUserById, createUser, loginUser } from "../controllers/usersController";

// GET /users => obtener todos los usuarios
// GET /users/:id => obtener un usuario por ID

// POST  /users/register => crear un nuevo usuario
//

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/register", createUser);

userRouter.post("/login", loginUser);

export default userRouter;