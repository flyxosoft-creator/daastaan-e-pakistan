import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// Public OAuth Client ID for Daastaan Web Client
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.AUTH_GOOGLE_ID ||
  '281603302527-bkee3nu9epapbvr4cok0cqp2shp9bola.apps.googleusercontent.com';

const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ||
  process.env.AUTH_GOOGLE_SECRET ||
  '';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    '2uSYvvXPM9H7wSc01qFgKfuPlZyZmhcQgYL0VmTlHx4=',
  trustHost: true,
});
