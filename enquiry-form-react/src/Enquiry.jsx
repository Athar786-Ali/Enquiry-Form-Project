import React, { useState, useEffect } from "react";
import EnquiryList from "./enquiry/EnquiryList";
import axios from "axios";
import { toast } from 'react-toastify';
import { HiUser, HiMail, HiPhone, HiChatAlt2, HiArrowLeft, HiSearch, HiSparkles } from "react-icons/hi";

const API_BASE = "https://backend-enquiry-form-project.vercel.app/api/enquiry";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [enquiryId, setEnquiryId] = useState(''); 

  const getAllEnquiry = () => {
    axios.get(`${API_BASE}/view`).then((res) => {
      if (res.data.status === 1) setEnquiryList(res.data.data);
    }).catch(err => console.error(err));
  };

  useEffect(() => { getAllEnquiry(); }, []);

  const saveEnquiry = (e) => {
    e.preventDefault();
    const call = enquiryId ? axios.put(`${API_BASE}/update/${enquiryId}`, formData) : axios.post(`${API_BASE}/insert`, formData);
    call.then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.msg);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setEnquiryId('');
        getAllEnquiry();
      }
    }).catch(() => toast.error("Error saving data"));
  };

  const filteredData = enquiryList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen">

      {/* HEADER section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <a href="/dashboard" className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-indigo-50 transition-all group">
            <HiArrowLeft className="text-xl text-slate-600 group-hover:text-indigo-600"/>
          </a>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Leads <span className="text-indigo-600 italic">Management</span> <HiSparkles className="text-yellow-400 text-2xl"/>
            </h1>
          </div>
        </div>

        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-4 top-4 text-slate-400 text-xl" />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_auto] gap-10 items-start">
        {/* FORM SECTION */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border-t-[10px] border-indigo-600 sticky top-10">
          <h2 className="text-2xl font-black mb-8 text-slate-800">
            {enquiryId ? 'Update Lead' : 'Register New Lead'}
          </h2>

          <form className="space-y-6" onSubmit={saveEnquiry}>
            <div className="relative">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-tighter mb-2 ml-1">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-700 placeholder:text-slate-400 transition-all" 
                  value={formData.name} 
                  onChange={e=>setFormData({...formData, name:e.target.value})} 
                  required 
                  placeholder="John Doe" 
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-tighter mb-2 ml-1">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-700 placeholder:text-slate-400 transition-all" 
                  value={formData.email} 
                  onChange={e=>setFormData({...formData, email:e.target.value})} 
                  required 
                  placeholder="john@example.com" 
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-tighter mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-700 placeholder:text-slate-400 transition-all" 
                  value={formData.phone} 
                  onChange={e=>setFormData({...formData, phone:e.target.value})} 
                  required 
                  placeholder="+91 00000 00000" 
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-tighter mb-2 ml-1">Requirements</label>
              <div className="relative">
                <HiChatAlt2 className="absolute left-4 top-5 text-slate-400 text-xl pointer-events-none" />
                <textarea 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-700 placeholder:text-slate-400 h-32 resize-none transition-all" 
                  value={formData.message} 
                  onChange={e=>setFormData({...formData, message:e.target.value})} 
                  required 
                  placeholder="How can we help?" 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] shadow-2xl transition-all active:scale-95 uppercase tracking-widest"
            >
              {enquiryId ? 'Update Information' : 'Save Enquiry'}
            </button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white rounded-2xl shadow-xl p-2 min-h-[600px]">
          <EnquiryList 
            data={filteredData} 
            getAllEnquiry={getAllEnquiry} 
            editRow={(item) => { 
              setFormData(item); 
              setEnquiryId(item._id); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }} 
          /> 
        </div>
      </div>
    </div>
  );
}