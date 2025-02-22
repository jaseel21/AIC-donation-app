import connectToDatabase from "../../../lib/db";

export default async function UsersPage() {
  const db = await connectToDatabase();
  const users = await db.collection("users").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl mb-4">Manage Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="p-2 bg-white rounded shadow">{user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}