import { getServerSession } from "next-auth";

export default async function VolunteerPage() {
  const session = await getServerSession();
  if (!session || session.user.role !== "Volunteer") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Volunteer Dashboard</h1>
      <ul className="space-y-2">
        <li><a href="/volunteer/add-box" className="bg-blue-500 text-white p-2 rounded inline-block">Add New Box</a></li>
        <li><a href="/volunteer/collect-box" className="bg-blue-500 text-white p-2 rounded inline-block">Collect Box</a></li>
        <li><a href="/volunteer/history" className="bg-blue-500 text-white p-2 rounded inline-block">Collection History</a></li>
        <li><a href="/volunteer/profile" className="bg-blue-500 text-white p-2 rounded inline-block">Profile</a></li>
      </ul>
    </div>
  );
}