import connectToDatabase from "../../../lib/db";

export default async function DonationDetailsPage({ params }) {
  const db = await connectToDatabase();
  const donation = await db.collection("donations").findOne({ _id: params.id });

  if (!donation) return <p>Donation not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Donation Details</h1>
      <p>ID: {donation._id}</p>
      <p>Amount: ₹{donation.amount}</p>
      <p>Type: {donation.type}</p>
      <p>Status: {donation.status}</p>
      {/* Add receipt generation logic here */}
    </div>
  );
}