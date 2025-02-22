import connectToDatabase from "../../lib/db";

export default async function CampaignsPage() {
  const db = await connectToDatabase();
  const campaigns = await db.collection("campaigns").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Campaign Donations</h1>
      <ul className="space-y-2">
        {campaigns.map((campaign) => (
          <li key={campaign._id} className="p-2 bg-white rounded shadow">
            <a href={`/donate/campaigns/${campaign._id}`}>{campaign.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}