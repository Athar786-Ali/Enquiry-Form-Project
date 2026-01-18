import React, { useState, useEffect } from "react";
import EnquiryList from "./enquiry/EnquiryList";
import API from "./api";
import { toast } from "react-toastify";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiArrowLeft,
  HiSearch,
  HiSparkles
} from "react-icons/hi";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [enquiryId, setEnquiryId] = useState("");

  // 🔹 GET ALL ENQUIRIES
  const getAllEnquiry = async () => {
    try {
      const res = await API.get("/enquiry/view");
      if (res.data.status === 1) {
        setEnquiryList(res.data.data);
      }
    } catch {
      toast.error("Failed to load enquiries");
    }
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  // 🔹 SAVE / UPDATE ENQUIRY WITH VALIDATION
  const saveEnquiry = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3)
      return toast.error("Name must be at least 3 characters");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Enter a valid email address");

    if (!/^\d{10}$/.test(formData.phone))
      return toast.error("Phone number must be 10 digits");

    if (formData.message.trim().length < 5)
      return toast.error("Message must be at least 5 characters");

    try {
      const res = enquiryId
        ? await API.put(`/enquiry/update/${enquiryId}`, formData)
        : await API.post("/enquiry/insert", formData);

      if (res.data.status === 1) {
        toast.success(res.data.msg);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setEnquiryId("");
        getAllEnquiry();
      }
    } catch {
      toast.error("Error saving enquiry");
    }
  };

  // 🔹 SEARCH FILTER
  const filteredData = enquiryList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
  );

  return (
    <div className="p-3 sm:p-4 md:p-10 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow flex items-center justify-center hover:bg-indigo-50"
          >
            <HiArrowLeft className="text-lg sm:text-xl text-slate-600" />
          </a>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 flex items-center gap-2">
            Leads <span className="text-indigo-600 italic">Management</span>
            <HiSparkles className="text-yellow-400" />
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-4 top-4 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-2xl shadow border focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_auto] gap-6">
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-t-8 border-indigo-600 lg:sticky lg:top-10">
          <h2 className="text-xl sm:text-2xl font-black mb-6 text-slate-800">
            {enquiryId ? "Update Lead" : "Register New Lead"}
          </h2>

          <form className="space-y-5" onSubmit={saveEnquiry}>
            <Input
              icon={<HiUser />}
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
            />

            <Input
              icon={<HiMail />}
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
            />

            <Input
              icon={<HiPhone />}
              label="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="9876543210"
            />

            {/* TEXTAREA – FIX 5 */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                Requirements
              </label>
              <textarea
                className="
                  w-full p-4
                  border-2 border-slate-200
                  rounded-xl sm:rounded-2xl
                  focus:ring-4 focus:ring-indigo-500/30
                  min-h-[100px] sm:min-h-[120px]
                  resize-none
                "
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 sm:py-5 rounded-xl sm:rounded-[1.5rem]"
            >
              {enquiryId ? "Update Information" : "Save Enquiry"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-2xl shadow-xl p-2 min-h-[500px]">
          <EnquiryList
            data={filteredData}
            getAllEnquiry={getAllEnquiry}
            editRow={(item) => {
              setFormData(item);
              setEnquiryId(item._id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input – FIX 4 (Mobile friendly) */
function Input({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-black text-slate-400 uppercase mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg sm:text-xl">
          {icon}
        </span>
        <input
          {...props}
          required
          className="
            w-full pl-12 pr-4
            py-3 sm:py-3.5
            bg-slate-50
            border-2 border-slate-200
            rounded-xl sm:rounded-2xl
            focus:ring-4 focus:ring-indigo-500/30
          "
        />
      </div>
    </div>
  );
}


