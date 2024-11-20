import { Router } from "express";
import { createUserHandler, getUserByIdHandler } from "../controllers/userController";
import validate from "../middlewares/validateResource";
import { createUserSchema } from "../schema/userSchema";

const userRoutes = Router();

userRoutes.post("/", validate(createUserSchema), createUserHandler);
userRoutes.get("/:id", getUserByIdHandler);

export default userRoutes;
