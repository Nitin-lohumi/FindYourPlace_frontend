import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    idToken?: string;
  }
  interface JWT {
    accessToken?: string;
    idToken?: string;
    User_id?: string;
    email?: string;
    name?: string;
    image?: string;
  }
}

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 15,
    },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.User_id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken as string;
        session.idToken = token.idToken as string;
        session.user.id = token.User_id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `http://localhost:3000/`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
