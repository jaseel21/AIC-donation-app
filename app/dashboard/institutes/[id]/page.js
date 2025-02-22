import connectToDatabase from "../../../lib/db";

export default async function InstituteDetailsPage({ params }) {
  const db = await connectToDatabase();
  const institute = await db.collection("institutes").findOne({ _id: params.id });

  if (!institute) return <p>Institute not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">{institute.name}</h1>
      {/* Add donation allocation logic */}
    </div>
  );
}