import { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
// Prisma adapter for NextAuth, optional and can be removed
import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // max age 90 days
    maxAge: 90 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      // const dbUser = await db.user.findFirst({
      //   where: {
      //     id: token.id,
      //   },
      // });

      // if (!dbUser) {
      //   token.id = user?.id ?? "Unknown";
      //   return token;
      // }

      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   picture: dbUser.image,
      // };

      return {
        id: token.id ?? token.sub,
        name: token.name,
        email: token.email,
        picture: token.picture,
        sub: token.sub,
      };
    },
  },
};
