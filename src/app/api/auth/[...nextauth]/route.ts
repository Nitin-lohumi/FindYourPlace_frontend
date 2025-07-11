import NextAuth from "next-auth";
import { authOption } from "../lib/authOption";
const handleOption = NextAuth(authOption);
export { handleOption as GET, handleOption as POST };
