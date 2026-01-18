import { HiUserGroup, HiClipboardList, HiLogout, HiMoon, HiSun } from "react-icons/hi";

export default function Dashboard({ dark, setDark }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 max-w-7xl mx-auto dark:bg-slate-900 transition-colors">

      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 sm:px-8">

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Athar <span className="text-indigo-600">Ali</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(prev => !prev)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-yellow-300 transition-colors"
            title="Toggle Dark Mode"
          >
            {dark ? <HiSun className="text-xl" /> : <HiMoon className="text-xl" />}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-red-600 font-medium transition-colors"
          >
            <HiLogout className="text-xl" /> Logout
          </button>
        </div>
      </nav>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Enquiry Leads */}
        <a
          href="/enquiries"
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
        >
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
            <HiUserGroup className="text-3xl text-indigo-600 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">
            Enquiry Leads
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Manage customer queries, track service requests and grow your business.
          </p>
          <div className="mt-6 inline-flex items-center text-indigo-600 font-semibold">
            Open Manager →
          </div>
        </a>

        {/* Task Manager */}
        <a
          href="/tasks"
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
        >
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
            <HiClipboardList className="text-3xl text-emerald-600 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">
            Task Manager
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Organize your daily workflow, set priorities, and never miss a deadline.
          </p>
          <div className="mt-6 inline-flex items-center text-emerald-600 font-semibold">
            Open Tracker →
          </div>
        </a>

      </div>
    </div>
  );
}
