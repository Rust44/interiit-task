import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongodb"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  ...authConfig
})