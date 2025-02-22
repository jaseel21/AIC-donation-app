import connectToDatabase from "../../lib/db";

export default async function SponsorshipsPage() {
  const db = await connectToDatabase();
  const sponsorships = await db.collection("sponsorships").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Sponsorship Management</h1>
      <ul className="space-y-2">
        {sponsorships.map((sponsorship) => (
          <li key={sponsorship._id} className="p-2 bg-white rounded shadow">
            {sponsorship.type} - ₹{sponsorship.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}