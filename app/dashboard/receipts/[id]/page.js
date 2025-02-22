import connectToDatabase from "../../../lib/db";

export default async function ReceiptDetailsPage({ params }) {
  const db = await connectToDatabase();
  const receipt = await db.collection("receipts").findOne({ _id: params.id });

  if (!receipt) return <p>Receipt not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Receipt Details</h1>
      <p>Donor: {receipt.donorName}</p>
      <p>Amount: ₹{receipt.amount}</p>
      {/* Add download logic with jsPDF */}
    </div>
  );
}