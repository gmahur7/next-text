import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from 'axios'
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { redirect } from "next/navigation";

export interface CustomSession {
  user?: CustomUser,
  expires: ISODateString
}

export interface CustomUser {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
  provider?: string | null
  token?: string | null
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/"
  },
  callbacks: {
    async signIn({ user, account, }: { user: CustomUser, account: Account | null }) {
      try {
        // console.log("user data: ", user)
        // console.log("user account: ", account)

        const payload = {
          email: user.email,
          name: user.name,
          oauth_id: account?.providerAccountId,
          provider: account?.provider,
          image: user.image
        }

        const { data } = await axios.post(LOGIN_URL, payload)
        // console.log("data from api", data.user)

        user.id = data?.user?.id?.toString()
        user.token = data?.user?.token
        user.provider = data?.user?.provider

        return true

      } catch (error) {
        if (error instanceof AxiosError) {
          return redirect(`/auth/error?message=${error.message}`);
        }
        return redirect(
          `/auth/error?message=Something went wrong.please try again!`
        );

      }
    },

    async jwt({ token, user }) {
      // console.log("jwt_token",token)
      // console.log("jwt_user",user)
      if (user) {
        token.user = user
      }
      return token
    },

    async session({ session, user, token }: { session: CustomSession, user: CustomUser, token: JWT }) {
      // console.log("session",session)
      // console.log("session_user",user)
      // console.log("session_token",token)
      session.user = token.user as CustomUser
      return session
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}