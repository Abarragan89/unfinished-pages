import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user }) {
            try {
                // const emailDomain = user.email?.split('@')[1];

                // if (emailDomain !== 'villagecharteracademy.com') {
                //     // If the email domain is not allowed, reject the sign-in
                //     return false;
                // }
                // // Check if the user exists in the database
                // const existingUser = await prisma.user.findUnique({
                //     where: { id: user.id }
                // });

                // if (!existingUser) {
                //     // Create a new user if they don't exist
                //     await prisma.user.create({
                //         data: {
                //             id: user.id || '',
                //             email: user.email || '',
                //             username: user.name || '',
                //             image: user.image || '',
                //         }
                //     });
                // }

                return true;
            } catch (error) {
                console.error('Error checking or creating user:', error);
                return false;
            }
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                // @ts-ignore
                session.user.id = token.sub; // token.sub === user.id
            }
            return session;
        },
    }
};