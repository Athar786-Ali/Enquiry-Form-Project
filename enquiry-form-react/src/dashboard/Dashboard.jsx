export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">

        <a href="/enquiries" className="p-6 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
          Enquiries
        </a>

        <a href="/tasks" className="p-6 bg-green-500 text-white rounded shadow hover:bg-green-600">
          Task Manager
        </a>

      </div>
    </div>
  );
}
