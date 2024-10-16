import DashNav from '@/components/Dashboard/DashNav'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateGroup from '@/components/chatGroup/CreateGroup'
import { ChatGroupTypes } from '@/types'
import { fetchChatGroups } from '@/fetchData'
import GroupChatCard from '@/components/chatGroup/GroupChatCard'

const Dashboard = async () => {

  const session: CustomSession | null = await getServerSession(authOptions)

  const groups: Array<ChatGroupTypes > = await fetchChatGroups(session?.user?.token!)

  return (
    <div>
      <DashNav name={session?.user?.name!} image={session?.user?.image! ?? undefined} />
      <div className="px-8 md:px-16">
        <div className='flex justify-end mt-10 mb-2'>
          <CreateGroup user={session?.user!} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard