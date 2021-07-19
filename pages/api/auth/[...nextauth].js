import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import Models from "./models";

const prisma = new PrismaClient();

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    secret: process.env.JWT_SECRET,
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      async session(session, user) {
        // console.log(`user in callback`, user);
        if (user) {
          session.user.userId = user.userId;
          return session;
        }
        return session;
      },
      async jwt(token, user, account, profile, isNewUser) {
        // console.log(`token`, token);
        // console.log(`user`, user);
        // console.log(`account`, account);
        // console.log(`profile`, profile);
        // console.log(`isNewUser`, isNewUser);
        // Place userid on the jwt for access in the session
        if (user) {
          token.userId = user.id;
          token.role = user.role;
        }

        return token;
      },
    },
  });
