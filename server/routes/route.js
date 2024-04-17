import express from "express";
import { addUser, getUser } from "../controller/user.js";
import {
  getConversation,
  newConversation,
} from "../controller/conversation.js";
import { getMessage, newMessage } from "../controller/message.js";
import { getImage, uploadImage } from "../controller/image.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/users", getUser);
router.post("/conversation/add", newConversation);
router.post("/conversation/get", getConversation);
router.post("/message/add", newMessage);
router.get("/message/get/:id", getMessage);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
export default router;
