import { Router } from "express";
import { createUserHandler } from "../controllers/userController";
import validate from "../middlewares/validateResource";
import { userSchema } from "../utils/validators";

const userRoutes = Router();

userRoutes.post("/", validate(userSchema), createUserHandler);
//userRoutes.get("/:id", getUserByIdHandler);

export default userRoutes;
