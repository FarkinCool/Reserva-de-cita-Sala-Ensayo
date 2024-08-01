import { Router } from "express";
import appointementRouter from "./appointmentsRouter";
import userRouter from "./usersRouter";

 const router =Router();

 router.use("/appointments", appointementRouter);
 router.use("/users", userRouter);

export default router;
