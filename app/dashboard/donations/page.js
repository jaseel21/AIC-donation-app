import connectToDatabase from "../../lib/db";

export default async function DonationsPage() {
  const db = await connectToDatabase();
  const donations = await db.collection("donations").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Donation Management</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id} className="border-t">
              <td className="p-2">{donation._id.toString()}</td>
              <td className="p-2">₹{donation.amount}</td>
              <td className="p-2">{donation.type}</td>
              <td className="p-2">{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}