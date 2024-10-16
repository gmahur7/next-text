import { CHAT_GROUP_URL, CHAT_GROUP_USERS_URL, CHATS_URL } from "./lib/apiEndPoints";

export async function fetchChatGroups (token:string){
    // console.log("hit",token)
    try {
        const res = await fetch(CHAT_GROUP_URL,{
            method: "GET", 
            headers: {
                'authorization': token, 
            },
            next:{
                revalidate:60*60,
                tags:["dashboard"]
            }
        })
    
        if(!res.ok){
            throw new Error("Failed to fetch data")   
        }
    
        const response =await res.json()
        if(response?.data){
            return response?.data 
        }
    } catch (error) {
        console.error("error: ",error)
        return []  
    }
}

export async function fetchChatGroup (id:string){
    try {
        const res = await fetch(`${CHAT_GROUP_URL}/group/${id}`,{
            method: "GET",
            cache:"no-cache"
        })
    
        if(!res.ok){
            console.log(res)
            throw new Error("Failed to fetch data")   
        }
    
        const response =await res.json()
        if(response?.data){
            return response?.data 
        }
    } catch (error) {
        console.error("error: ",error)
        return null 
    }
}

export async function fetchChatUsers (id:string){
    // console.log("hit",token)
    try {
        const res = await fetch(`${CHAT_GROUP_USERS_URL}?group_id=${id}`,{
            method: "GET", 
            cache:"no-cache"
        })
    
        if(!res.ok){
            throw new Error("Failed to fetch data")   
        }
    
        const response =await res.json()
        if(response?.data){
            return response?.data 
        }
    } catch (error) {
        console.error("error: ",error)
        return []  
    }
}

export async function fetchChats (id:string){

    try {
        const res = await fetch(`${CHATS_URL}/${id}`,{
            method: "GET",
            cache:"no-cache"
        })
    
        if(!res.ok){
            throw new Error("Failed to fetch data")   
        }
    
        const response =await res.json()
        if(response?.data){
            return response?.data 
        }
    } catch (error) {
        console.error("error: ",error)
        return []  
    }
}

