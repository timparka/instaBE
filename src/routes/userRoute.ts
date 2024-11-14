import { Router } from "express";
import { createUser, getUserById } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/:id", getUserById);

userRoutes.post("/", createUser);

export default userRoutes;