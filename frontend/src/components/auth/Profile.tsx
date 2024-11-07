"use client"
import React, { Suspense, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import dynamic from 'next/dynamic'
const LogoutModel = dynamic(()=> import("./LogoutModel"))


const Profile = ({ name, image }: { name: string, image?: string }) => {

  const [logogutOpen, setLogoutOpen]=useState<boolean>(false)

  return (
    <>
    {
      logogutOpen && 
      <Suspense fallback={<p>Loading...</p>}>
        <LogoutModel open={logogutOpen} setOpen={setLogoutOpen}/>
      </Suspense>
    }
    <DropdownMenu>
      <DropdownMenuTrigger><UserAvatar name={name} image={image}/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setLogoutOpen(true)}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default Profile