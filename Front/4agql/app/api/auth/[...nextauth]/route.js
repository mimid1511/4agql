import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { gql } from "@apollo/client";
import { loginClient } from "@/lib/apolloClient";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { email, password } = credentials;

        // const user = { id: "1", email: email, password: password }
        // if (user) {
        //   return user
        // } else {
        //   return null
        // }

        const { data } = await loginClient().mutate({ mutation: gql`
        mutation {
            login(email: "${email}", password: "${password}") 
        }` });

        if (data) {
          const token = jwtDecode(data.login);
          console.log(token);
          const user = { id: token, dert : "data", email: email, password: password }
          return user
        } else {
          return null
        }
      }
    })
  ],

})

export { handler as GET, handler as POST }