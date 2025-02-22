import connectToDatabase from "../../lib/db";

export default async function ReceiptsPage() {
  const db = await connectToDatabase();
  const receipts = await db.collection("receipts").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Payment Receipts</h1>
      <ul className="space-y-2">
        {receipts.map((receipt) => (
          <li key={receipt._id} className="p-2 bg-white rounded shadow">
            Donor: {receipt.donorName} - ₹{receipt.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}