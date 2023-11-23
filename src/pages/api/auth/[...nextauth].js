import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { CognitoIdentityServiceProvider } from "aws-sdk";

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID2,
      clientSecret: process.env.COGNITO_CLIENT_SECRET2,
      issuer: process.env.COGNITO_ISSUER2,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub;
      return session;
    },
  },
  secret: "gvF8KSUfMG9yCiM5DXFTgrRvsI/kRPQ3AZ3eLW5d/D0=",
});
