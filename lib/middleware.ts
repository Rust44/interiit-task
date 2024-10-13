import authConfig from "@/lib/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};