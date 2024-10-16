import Env from "./env";

export const BASE_URL = Env.BECKEND_URL
export const API_URL = BASE_URL+'/api'
export const LOGIN_URL = API_URL+'/auth/login'
export const CHAT_GROUP_URL = API_URL+'/chat-group'
export const CHATS_URL = API_URL+'/chats'
export const CHAT_GROUP_USERS_URL = API_URL+'/chat-group-users'