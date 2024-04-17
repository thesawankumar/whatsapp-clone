import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const newMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });
    res.status(200).json("Message has been sent successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }

}