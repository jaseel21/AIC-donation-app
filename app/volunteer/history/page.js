import connectToDatabase from "../../lib/db";

export default async function HistoryPage() {
  const db = await connectToDatabase();
  const collections = await db.collection("boxCollections").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Collection History</h1>
      <ul className="space-y-2">
        {collections.map((collection) => (
          <li key={collection._id} className="p-2 bg-white rounded shadow">
            Box ID: {collection.boxId} - Date: {collection.date}
          </li>
        ))}
      </ul>
    </div>
  );
}