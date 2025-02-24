import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route"; // Import NextAuth options

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "No session found" }, { status: 401 });
        }

        const customSession = {
            user: {
                id: session.user.id,
                email: session.user.email,
                role: session.user.role,
                lastLogin: new Date().toISOString(),
            },
            expires: session.expires,
        };

        return NextResponse.json(customSession, { status: 200 });
    } catch (error) {
        console.error("Session fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
    }
}
