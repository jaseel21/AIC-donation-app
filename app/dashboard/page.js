import { getServerSession } from "next-auth";
import connectToDatabase from "../lib/db";
import { redirect } from "next/navigation";
import Donation from "../models/Donation";
import Box from "../models/Box";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user?.role) {
    redirect("/auth/signin");
    return null;
  }

  // Optional: Restrict to specific roles (e.g., Admin, Super Admin)
  const requiredRole = "User"; // Minimum role required (adjust as needed)
  const rolesHierarchy = {
    "User": 0,
    "Volunteer": 1,
    "Staff": 2,
    "Admin": 3,
    "Manager": 4,
    "Super Admin": 5
  };

  if (rolesHierarchy[session.user.role] < rolesHierarchy[requiredRole]) {
    redirect("/auth/signin");
    return null;
  }
  await connectToDatabase();
  const totalDonations = await Donation.countDocuments();
  const activeBoxes = await Box.countDocuments({ status: "Active" });

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