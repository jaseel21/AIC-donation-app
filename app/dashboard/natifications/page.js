export default function NotificationsPage() {
    return (
      <div>
        <h1 className="text-2xl mb-4">Notification Management</h1>
        <a href="/dashboard/notifications/templates" className="bg-blue-500 text-white p-2 rounded mr-2">Templates</a>
        <a href="/dashboard/notifications/send" className="bg-blue-500 text-white p-2 rounded">Send Notification</a>
      </div>
    );
  }