import {io,Socket} from 'socket.io-client'
import Env from './env';

let socket:Socket;

export const getSocket = ():Socket=>{
    if(!socket){
        socket = io(Env.BECKEND_URL,{
            autoConnect:false
        }) 
        console.log("socket connect: ")
    }
    return socket;
}