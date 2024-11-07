"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createChatSchema, createChatSchemaType } from '@/validations/groupChatValidations'
import { Input } from '../ui/input'
import { authOptions, CustomUser } from '@/app/api/auth/[...nextauth]/options'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints'
import { headers } from 'next/headers'
import { clearCache } from '@/actions/common'


const CreateGroup = ({ user }: { user: CustomUser }) => {

    const { register, handleSubmit, formState: { errors }, } = useForm<createChatSchemaType>({ resolver: zodResolver(createChatSchema) })
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    const onSubmit = async (payload: createChatSchemaType) => {
        console.log(CHAT_GROUP_URL)
        setLoading(true)
        try {
            const { data } = await axios.post(CHAT_GROUP_URL, { ...payload, user_id: user.id },
                {
                    headers: {
                        Authorization: user.token
                    }
                }
            )
            if(data.success){
                clearCache("dashboard")
                setLoading(false)
                toast.success(data.message)
                setOpen(false)
            }
        } catch (error) {
            setLoading(false)
            if (error instanceof AxiosError) {
                toast.error(error.message)
            }
            else {
                toast.error("Something went wrong. Please try again")
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Group</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Create your new chat</DialogTitle>
                    <DialogDescription>
                        Create a new chat by entering a unique title and secure passcode. The passcode ensures only authorized users can access the chat.
                        {/* Once created, share the title and passcode to invite participants securely. */}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-4'>
                        <Input placeholder='Enter Chat Title' {...register("title")} />
                        <span className='text-red-500'>{errors?.title?.message}</span>
                    </div>
                    <div className='mt-4'>
                        <Input placeholder='Enter Chat Passcode' {...register("passcode")} />
                        <span className='text-red-500'>{errors?.passcode?.message}</span>
                    </div>
                    <div className='mt-4'>
                        <Button className='w-full' disabled={loading}>{loading ? 'Processing...' : 'Submit'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateGroup