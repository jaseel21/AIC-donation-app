import connectToDatabase from "../../../lib/db";

export default async function VolunteerDetailsPage({ params }) {
  const db = await connectToDatabase();
  const volunteer = await db.collection("volunteers").findOne({ _id: params.id });

  if (!volunteer) return <p>Volunteer not found</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">{volunteer.name}</h1>
      <p>Email: {volunteer.email}</p>
      {/* Add task assignment logic */}
    </div>
  );
}