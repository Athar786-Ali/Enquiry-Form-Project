export default function Dashboard() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <a
          href="/enquiries"
          className="p-6 bg-blue-500 text-white rounded"
        >
          Enquiries
        </a>

        <a
          href="/tasks"
          className="p-6 bg-green-500 text-white rounded"
        >
          Task Manager
        </a>
      </div>
    </div>
  );
}
