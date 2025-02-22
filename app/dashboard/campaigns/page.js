import connectToDatabase from "../../lib/db";

export default async function CampaignsPage() {
  const db = await connectToDatabase();
  const campaigns = await db.collection("campaigns").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Campaign Management</h1>
      <a href="/dashboard/campaigns/create" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Create Campaign</a>
      <ul className="space-y-2">
        {campaigns.map((campaign) => (
          <li key={campaign._id} className="p-2 bg-white rounded shadow">
            {campaign.name} - ₹{campaign.totalRaised || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}