import connectToDatabase from "../../../lib/db";

export default async function AgentDetailsPage({ params }) {
  const db = await connectToDatabase();
  const agent = await db.collection("agents").findOne({ _id: params.id });

  if (!agent) return <p>Agent not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">{agent.name}</h1>
      <p>Area: {agent.area}</p>
      {/* Add collection stats */}
    </div>
  );
}