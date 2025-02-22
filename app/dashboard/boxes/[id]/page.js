import connectToDatabase from "../../../lib/db";

export default async function BoxDetailsPage({ params }) {
  const db = await connectToDatabase();
  const box = await db.collection("boxes").findOne({ _id: params.id });

  if (!box) return <p>Box not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Box Details</h1>
      <p>Serial Number: {box.serialNumber}</p>
      <p>Holder: {box.holderName}</p>
      <p>Status: {box.status}</p>
    </div>
  );
}