export default function SettingsPage() {
    return (
      <div>
        <h1 className="text-2xl mb-4">Settings</h1>
        <a href="/dashboard/settings/users" className="bg-blue-500 text-white p-2 rounded mr-2">Users</a>
        <a href="/dashboard/settings/roles" className="bg-blue-500 text-white p-2 rounded mr-2">Roles</a>
        <a href="/dashboard/settings/system" className="bg-blue-500 text-white p-2 rounded">System</a>
      </div>
    );
  }