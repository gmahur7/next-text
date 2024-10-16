import ChatBase from '@/components/chats/ChatBase'
import { fetchChatGroup, fetchChats, fetchChatUsers } from '@/fetchData'
import { ChatGroupTypes, GroupChatUserType, MessageType } from '@/types'
import { notFound } from 'next/navigation'

const Chats = async ({ params }: { params: { id: string } }) => {

  if (params.id.length !== 36) {
    return notFound()
  }

  const group: ChatGroupTypes | null = await fetchChatGroup(params.id)
  console.log("group: ", group)

  if (group === null) {
    return notFound()
  }

  const users: Array<GroupChatUserType> | [] = await fetchChatUsers(params.id)

  const chats: Array<MessageType> | [] = await fetchChats(params.id)

  return (
    <div>
      <ChatBase group={group} users={users} oldMessages={chats} />
    </div>
  )
}

export default Chats