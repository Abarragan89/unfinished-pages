import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
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
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: 'Unfinshed Pages',
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // Used for server-side middleware authentication/authorization
        async jwt({ token }) {
            // If this is the first sign-in, attach isAuthor to the token
            if (token.sub) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.sub },
                    select: { isAuthor: true, isAdmin: true }, // Fetch only the necessary field
                });
                token.isAuthor = dbUser?.isAuthor || false;
                token.isAdmin = dbUser?.isAdmin || false;
            }
            return token;
        },
        // Used for client side UI rendering
        session: async ({ session }) => {
            if (session?.user?.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email },
                    select: { isAuthor: true, isAdmin: true, id: true }, // Fetch only the necessary field
                });
                session.isAuthor = dbUser?.isAuthor || false;
                session.isAdmin = dbUser?.isAdmin || false;
                session.user.id = dbUser?.id;
            }
            return session;
        },
    }
};