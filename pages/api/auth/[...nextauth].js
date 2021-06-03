import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import Models from "./models";

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
    adapter: Adapters.TypeORM.Adapter(process.env.DATABASE_URL, {
      models: {
        User: Models.User,
      },
    }),
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      async session(session, user) {
        if (user) {
          session.user.userId = user.userId;
          return session;
        }
        return session;
      },
      async jwt(token, user, account, profile, isNewUser) {
        // Place userid on the jwt for access in the session
        if (user) {
          token.userId = user.id;
          token.role = user.role;
        }

        return token;
      },
    },
  });
