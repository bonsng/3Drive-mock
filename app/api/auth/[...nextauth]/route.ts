import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          },
        );

        const data = await res.json();

        if (data.isSuccess && data.result) {
          return {
            id: data.result.rootFolderId,
            accessToken: data.result.tokenInfo.accessToken,
            refreshToken: data.result.tokenInfo.refreshToken,
            nickName: data.result.username,
            rootFolderId: data.result.rootFolderId,
            trashFolderId: data.result.trashFolderId,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.nickName = user.nickName;
        token.rootFolderId = user.rootFolderId;
        token.trashFolderId = user.trashFolderId;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.nickName = token.nickName;
      session.rootFolderId = token.rootFolderId;
      session.trashFolderId = token.trashFolderId;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
