import authOptions from "./authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
