import mongoose from "mongoose";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "../../../../../models/User";
var bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URL);

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                console.log(credentials);
                
                const user = await User.findOne({ email });
                const passwordOk = user && bcrypt.compareSync(password, user.password);

                // If no error and we have user data, return it
                if (passwordOk) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
        // ...add more providers here
    ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }