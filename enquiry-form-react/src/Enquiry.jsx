import React, { useState, useEffect } from "react";
import EnquiryList from "./enquiry/EnquiryList";
import API from "./api";
import { toast } from "react-toastify";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiChatAlt2,
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to load enquiries");
    }
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  // 🔹 SAVE / UPDATE ENQUIRY
  const saveEnquiry = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      console.error(err);
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
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <a
            href="/dashboard"
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-indigo-50 transition-all group"
          >
            <HiArrowLeft className="text-xl text-slate-600 group-hover:text-indigo-600" />
          </a>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Leads <span className="text-indigo-600 italic">Management</span>
            <HiSparkles className="text-yellow-400 text-2xl" />
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-4 top-4 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_auto] gap-10 items-start">
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border-t-[10px] border-indigo-600 sticky top-10">
          <h2 className="text-2xl font-black mb-8 text-slate-800">
            {enquiryId ? "Update Lead" : "Register New Lead"}
          </h2>

          <form className="space-y-6" onSubmit={saveEnquiry}>
            {/* NAME */}
            <Input
              icon={<HiUser />}
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
            />

            {/* EMAIL */}
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

            {/* PHONE */}
            <Input
              icon={<HiPhone />}
              label="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+91 00000 00000"
            />

            {/* MESSAGE */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                Requirements
              </label>
              <textarea
                className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/30"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-[1.5rem]"
            >
              {enquiryId ? "Update Information" : "Save Enquiry"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-2xl shadow-xl p-2 min-h-[600px]">
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

/* 🔹 Small reusable input component */
function Input({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-black text-slate-400 uppercase mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
          {icon}
        </span>
        <input
          {...props}
          required
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/30"
        />
      </div>
    </div>
  );
}
