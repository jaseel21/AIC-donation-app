import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectToDatabase from "../lib/db";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session || !["Super Admin", "Admin", "Manager"].includes(session.user?.role)) {
    redirect("/api/auth/signin");
  }

  const db = await connectToDatabase();
  const totalDonations = await db.collection("donations").countDocuments();
  const activeBoxes = await db.collection("boxes").countDocuments({ status: "Active" });

  return (
    <div>
      <h1 className="text-2xl mb-4">Dashboard Overview</h1>
      <p>Welcome, {session.user.email} ({session.user.role})</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-white rounded shadow">
          <h2>Total Donations</h2>
          <p>{totalDonations}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2>Active Boxes</h2>
          <p>{activeBoxes}</p>
        </div>
      </div>
    </div>
  );
}