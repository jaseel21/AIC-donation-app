// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "../../../models/User"; // Adjust path based on your structure
import bcrypt from "bcrypt";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
};

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ email: credentials.email });
            
                    if (!user) throw new Error("No user found with this email");
            
                    const match = await bcrypt.compare(credentials.password, user.password);
                    if (!match) throw new Error("Incorrect password");
            
                    console.log("User Found:", user); // Debugging
                    console.log("User Role:", user.role); // Debugging
            
                    return { id: user._id.toString(), email: user.email, role: user.role };
                } catch (error) {
                    console.error("Error in authorize:", error);
                    throw error;
                }
            }
            
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role; // ✅ Ensure role is included
            }
            console.log("JWT Token:", token); // Debugging
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role; // ✅ Ensure role is in session
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

// Export named HTTP methods
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import mongoose from "mongoose";
// import User from "../../../models/User";
// import bcrypt from 'bcryptjs'

// const connectDB = async () => {
//   if (mongoose.connection.readyState === 1) return;
//   await mongoose.connect(process.env.MONGODB_URI, {
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//   });
// };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           await connectDB();
//           const user = await User.findOne({ email: credentials.email });
          
//           if (!user) throw new Error("No user found with this email");

         
          
//           (async () => {
//             const match = await bcrypt.compare(credentials.password,user.password);
//             console.log("Password Match:", match);
//           })();
//           return { id: user._id.toString(), email: user.email, role: user.role };
//         } catch (error) {
//           console.error("Error in authorize:", error);
//           throw error;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // Add role to token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role; // Add role to session
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };