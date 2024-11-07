import Profile from '@/components/auth/Profile'
import React from 'react'

const DashNav = ({ name, image }: { name: string, image?: string }) => {
  return (
    <div className='p-6 flex justify-between items-center bg-white shadow-sm'>
        <h1 className='text-xl md:text-2xl font-extrabold'>
            NextText
        </h1>
        <div className='flex items-center space-x-2 md:space-x-6 text-grey-700'>
           <Profile name={name} image={image}/> 
        </div>
    </div>
  )
}

export default DashNav