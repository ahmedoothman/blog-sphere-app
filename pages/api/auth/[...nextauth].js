import NextAuth from 'next-auth/next';
import gitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    gitHubProvider({
      clientId: process.env.client_Id,
      clientSecret: process.env.client_Secret,
    }),
  ],
});
