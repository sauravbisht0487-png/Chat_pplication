import express from "express";
import { sendMessage } from "../controllers/messageController";
const router = express.Router();

router.route("/send/:id").post(sendMessage)