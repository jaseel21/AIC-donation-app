import connectToDatabase from "../../../lib/db";

export default async function CampaignDetailsPage({ params }) {
  const db = await connectToDatabase();
  const campaign = await db.collection("campaigns").findOne({ _id: params.id });

  if (!campaign) return <p>Campaign not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">{campaign.name}</h1>
      <p>Total Raised: ₹{campaign.totalRaised || 0}</p>
      {/* Add progress tracking logic */}
    </div>
  );
}