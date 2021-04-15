import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    database: process.env.DATABASE_URL,
    pages: {
      signIn: '/signin',
    },
    callbacks: {
      async jwt(token, user, account, profile, isNewUser) {
        // Add Github's profile.bio to the token right after signin
        if (profile?.bio) {
          token.bio = profile.bio;
        }
        return token;
      },
      session(session, user) {
        console.log({ session, user });
        if (user) {
          session.user.id = user.id;
          session.user.bio = user.bio;
          return session;
        }
      },
    },
  });
