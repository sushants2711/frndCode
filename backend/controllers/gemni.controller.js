import { generateChatForUser } from "../config/google.gemni.ai";
import gemniModel from "../models/gemni.model.js";



export const createChat = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ success: false, message: "Query are required? " });
        };

        const response = await generateChatForUser(question);

        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate AI response"
            });
        };

        const saveDb = new gemniModel({
            question,
            answer: response,
            user: loggedInUser
        });

        const saveUser = await saveDb.save();

        return res.status(201).json({ success: true, message: "Response Generated Successfully", data: response });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}



export const getAllChat = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const allChat = await gemniModel.find({ user: loggedInUser }).sort({ createdAt: -1 });;

        return res.status(200).json({ success: true, message: "All chat fetch Successfully", data: allChat });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}