import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatsController {
    static async index(req: Request, res: Response) {
        const { groupId } = req.params;
        try {
            const chats = await prisma.chats.findMany({
                where: {
                    group_id: groupId,
                },
            });
            if (!chats) {
                return res.status(400).json({ success: false, message: "No Chats Found" });
            }
            return res.status(200).json({ success: true, data: chats });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Something went wrong. Please try after sometime" });
        }
    }
}

export default ChatsController;