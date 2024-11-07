import { Request, Response } from 'express'
import prisma from '../config/db.config.js';
import { io } from '../index.js';

interface GroupUserType {
    name: string
    group_id: string
}

class ChatGroupUserControllers {
    static async index(req: Request, res: Response) {
        try {

            const { group_id } = req.query;
            const users = await prisma.chatGroupusers.findMany({
                where: {
                    group_id: group_id as string
                }
            })

            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: users
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }
    static async store(req: Request, res: Response) {
        try {

            const body: GroupUserType = req.body;
            const user = await prisma.chatGroupusers.create({
                data: body
            })

            io.to(body.group_id).emit("new_user");
            

            return res.status(200).json({
                success: true,
                message: "User added successfully",
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }
}

export default ChatGroupUserControllers;