import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiTrash, HiPencilAlt, HiUserCircle } from "react-icons/hi";

const API_BASE = "https://backend-enquiry-form-project.vercel.app/api/enquiry";

export default function EnquiryList({ data, getAllEnquiry, editRow }) {

  const deleteEnquiry = (id) => {
    if (window.confirm("Kya aap sach mein ise delete karna chahte hain?")) {
      axios.delete(`${API_BASE}/delete/${id}`)
        .then((res) => {
          if (res.data.status === 1) {
            toast.success("Enquiry deleted!");
            getAllEnquiry();
          }
        })
        .catch(() => toast.error("Delete karne mein error aaya"));
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Recent Enquiries</h2>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
          Total: {data.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-slate-500 text-sm uppercase tracking-wider">
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="bg-white/50 hover:bg-white transition-all shadow-sm group">
                  <td className="px-4 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-600 font-medium">{item.email}</div>
                    <div className="text-xs text-slate-400">{item.phone}</div>
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <p className="text-sm text-slate-500 truncate">{item.message}</p>
                  </td>
                  <td className="px-4 py-4 rounded-r-2xl text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => editRow(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <HiPencilAlt className="text-xl" />
                      </button>
                      <button 
                        onClick={() => deleteEnquiry(item._id)}
                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                        title="Delete"
                      >
                        <HiTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-20 text-slate-400 font-medium">
                  Abhi tak koi data nahi mila. 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}