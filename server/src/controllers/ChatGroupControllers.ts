import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupControllers {

    static async createGroup(req: Request, res: Response) {
        // console.log(req.body)
        try {
            const body = req.body;
            const user = req.user;
            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id
                }
            })

            return res.status(201).json({
                success: true,
                message: "Chat groups created successfully!"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }

    static async index(req: Request, res: Response) {
        console.log("abc")
        try {
            const user = req.user;

            const groupData = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id
                },
                orderBy: {
                    created_at: "desc"
                }
            })

            if (!groupData) {
                return res.status(404).json({
                    success: false,
                    message: 'Group data not found'
                })
            }

            return res.status(200).json({
                success: true,
                message:'Chat groups fetched successfully',
                data: groupData
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const {id}=req.params;

            const groupData = await prisma.chatGroup.findUnique({
                where:{
                    id:id
                }
            })
            console.log("group",groupData)

            if (!groupData) {
                return res.status(404).json({
                    success: false,
                    message: 'Group data not found'
                })
            }

            return res.status(200).json({
                success: true,
                message:'Chat group fetched successfull',
                data: groupData
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const body = req.body;
            const {id} = req.params;

            await prisma.chatGroup.update({
                data: {
                    title: body.title,
                    passcode: body.passcode
                },
                where:{
                    id:id
                }
            })

            return res.status(200).json({
                success: true,
                message:'Chat group Updated successfull',
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }

    static async destroy(req: Request, res: Response) {
        console.log("del")
        try {
            const {id}=req.params;

            await prisma.chatGroup.delete({
                where:{
                    id:id
                }
            })

            return res.status(200).json({
                success: true,
                message:'Chat group deleted successfully',
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again!"
            })
        }
    }
    
}

export default ChatGroupControllers;
