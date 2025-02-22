import connectToDatabase from "../../../lib/db";

export default async function SponsorshipDetailsPage({ params }) {
  const db = await connectToDatabase();
  const sponsorship = await db.collection("sponsorships").findOne({ _id: params.id });

  if (!sponsorship) return <p>Sponsorship not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Sponsorship Details</h1>
      <p>Type: {sponsorship.type}</p>
      <p>Amount: ₹{sponsorship.amount}</p>
      <p>Duration: {sponsorship.duration}</p>
    </div>
  );
}