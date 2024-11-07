'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react"


const LoginModal = () => {

    const handleLogin = async()=>{
        signIn("google",{
            callbackUrl:"/dashboard",
            redirect:true
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Getting Started</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Welcome to NextText</DialogTitle>
                    <DialogDescription>
                        NextText make it effortless to create secure chat links and start conversation in seconds.
                    </DialogDescription>
                </DialogHeader>
                <Button variant='outline' onClick={handleLogin}>
                    <Image
                        src="/images/google.png"
                        alt="google"
                        className="mr-4"
                        height={25}
                        width={25}
                    />
                </Button>
            </DialogContent>
        </Dialog>

    )
}

export default LoginModal