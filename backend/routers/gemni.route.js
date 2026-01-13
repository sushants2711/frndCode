import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.js";
import { createChat, getAllChat } from "../controllers/gemni.controller.js";

const gemniRouter = express.Router();

gemniRouter.route("/add").post(verifyCookies, createChat);
gemniRouter.route("/get").get(verifyCookies, getAllChat);

export default gemniRouter;