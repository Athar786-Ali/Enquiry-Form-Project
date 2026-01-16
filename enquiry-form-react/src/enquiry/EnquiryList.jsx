import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

// 🔥 Backend API Base URL (Vercel)
const API_BASE = "https://backend-enquiry-form-project.vercel.app/api/enquiry";

export default function EnquiryList({ data, getAllEnquiry, editRow }) {

  const deleteEnquiry = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {

      axios.delete(`${API_BASE}/delete/${id}`)
        .then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.msg);
            getAllEnquiry();
          }
        })
        .catch(() => {
          toast.error("Error deleting data");
        });
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">Enquiry List</h2>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">SR NO</th>
              <th className="px-6 py-3">NAME</th>
              <th className="px-6 py-3">EMAIL</th>
              <th className="px-6 py-3">PHONE</th>
              <th className="px-6 py-3">MESSAGE</th>
              <th className="px-6 py-3">DELETE</th>
              <th className="px-6 py-3">EDIT</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.message}</td>

                  <td className="px-6 py-4">
                    <button 
                      onClick={() => deleteEnquiry(item._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Delete
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button 
                      onClick={() => editRow(item)}
                      className="font-medium text-cyan-600 dark:text-cyan-500 hover:underline">
                        Edit
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
