import connectToDatabase from "../../lib/db";

export default async function BoxesPage() {
  const db = await connectToDatabase();
  const totalBoxes = await db.collection("boxes").countDocuments();
  const activeBoxes = await db.collection("boxes").countDocuments({ status: "Active" });
  const deadBoxes = totalBoxes - activeBoxes;

  return (
    <div>
      <h1 className="text-2xl mb-4">Box Management</h1>
      <p>Total Boxes: {totalBoxes}</p>
      <p>Active Boxes: {activeBoxes}</p>
      <p>Dead Boxes: {deadBoxes}</p>
    </div>
  );
}