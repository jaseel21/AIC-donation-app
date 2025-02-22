wait connectToDatabase();
  const volunteers = await db.collection("volunteers").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Volunteer Management</h1>
      <ul className="space-y-2">
        {volunteers.map((volunteer) => (
          <li key={volunteer._id} className="p-2 bg-white rounded shadow">{volunteer.name}</li>
        ))}
      </ul>
    </div>
  );
}