import NextAuth from "next-auth";
import Providers from "next-auth/providers";

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
    database: process.env.DATABASE_URL,
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
        }

        return token;
      },
    },
  });
