import { HiUserGroup, HiClipboardList, HiLogout } from "react-icons/hi";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
   <div className="min-h-screen p-8 max-w-7xl mx-auto ">

      {/* Navbar */}
      <nav className="flex justify-between items-center mb-12 bg-white rounded-2xl shadow-xl p-4 px-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">G</div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Athar <span className="text-indigo-600">Ali</span>
          </h1>
        </div>
        <button 
          onClick={logout} 
          className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
        >
          <HiLogout className="text-xl" /> Logout
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 - Enquiry Leads */}
        <a 
          href="/enquiries" 
          className="bg-white rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300 border border-slate-100"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
            <HiUserGroup className="text-3xl text-indigo-600 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-slate-800">Enquiry Leads</h3>
          <p className="text-slate-500">Manage customer queries, track service requests and grow your business.</p>
          <div className="mt-6 inline-flex items-center text-indigo-600 font-semibold">Open Manager →</div>
        </a>

        {/* Card 2 - Task Manager */}
        <a 
          href="/tasks" 
          className="bg-white rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300 border border-slate-100"
        >
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
            <HiClipboardList className="text-3xl text-emerald-600 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-slate-800">Task Manager</h3>
          <p className="text-slate-500">Organize your daily workflow, set priorities, and never miss a deadline.</p>
          <div className="mt-6 inline-flex items-center text-emerald-600 font-semibold">Open Tracker →</div>
        </a>
      </div>
    </div>
  );
}