import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/db";
import Admin from "../../../models/Admin";
import Volunteer from "../../../models/Volunteer";
import User from "../../../models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        // Check all collections for the user
        let user = await User.findOne({ email: credentials.email });
        if (!user) user = await Admin.findOne({ email: credentials.email });
        if (!user) user = await Volunteer.findOne({ email: credentials.email });

        if (!user) throw new Error("No account found with this email");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.email = user.email;
            token.role = user.role; //  Ensure role is included
        }
        console.log("JWT Token:", token); // Debugging
        return token;
    },
    async session({ session, token }) {
        if (token) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.role = token.role; //  Ensure role is in session
        }
        console.log("Session Updated:", session); // Debugging
        return session;
    },
},
pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
},
secret: process.env.NEXTAUTH_SECRET,
session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
