import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function VolunteerLayout({ children }) {
  const session = await getServerSession();
  if (!session || session.user.role !== "Volunteer") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <Link href="/" className="text-xl">Donation App</Link>
        <Link href="/auth/signout" className="ml-4">Sign Out</Link>
      </header>
      <main className="p-6">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Donation App</p>
      </footer>
    </div>
  );
}