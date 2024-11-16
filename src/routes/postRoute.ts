import { Router } from "express";
import { createPostHandler } from "../controllers/postController";
import validate from "../middlewares/validateResource";
import { postSchema } from "../utils/validators";

const userRoutes = Router();

userRoutes.post("/", validate(postSchema), createPostHandler);


