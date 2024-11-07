import { z } from "zod";

export const createChatSchema = z.object({
    title:z.string().min(4,{message:"Chat title must be 4 characters long."}).max(15,{message:"Chat title must no more longer than 15 characters"}),
    passcode:z.string().min(6,{message:"Chat Password must be 6 characters long."}).max(18,{message:"Chat title must no more longer than 18 characters"})
}).required()

export type createChatSchemaType = z.infer<typeof createChatSchema>