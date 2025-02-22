import connectToDatabase from "../../lib/db";

export default async function AgentsPage() {
  const db = await connectToDatabase();
  const agents = await db.collection("agents").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Agent Management</h1>
      <ul className="space-y-2">
        {agents.map((agent) => (
          <li key={agent._id} className="p-2 bg-white rounded shadow">{agent.name}</li>
        ))}
      </ul>
    </div>
  );
}