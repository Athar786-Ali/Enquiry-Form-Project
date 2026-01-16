import React, { useState, useEffect } from "react";
import EnquiryList from "./enquiry/EnquiryList";
import axios from "axios";
import { toast } from 'react-toastify';
import { HiUser, HiMail, HiPhone, HiChatAlt2, HiArrowLeft } from "react-icons/hi";

const API_BASE = "https://backend-enquiry-form-project.vercel.app/api/enquiry";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]); 
  const [enquiryId, setEnquiryId] = useState(''); 
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const getAllEnquiry = () => {
    axios.get(`${API_BASE}/view`).then((res) => {
      if (res.data.status === 1) setEnquiryList(res.data.data);
    }).catch(err => console.error(err));
  };

  useEffect(() => { getAllEnquiry(); }, []);

  const saveEnquiry = (e) => {
    e.preventDefault();
    const apiCall = enquiryId ? axios.put(`${API_BASE}/update/${enquiryId}`, formData) : axios.post(`${API_BASE}/insert`, formData);
    
    apiCall.then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.msg);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setEnquiryId('');
        getAllEnquiry();
      }
    }).catch(() => toast.error("Something went wrong"));
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <a href="/dashboard" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50"><HiArrowLeft className="text-xl"/></a>
        <h1 className="text-3xl font-black text-slate-800">Enquiry <span className="text-indigo-600">Leads</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_auto] gap-8 items-start">
        {/* FORM SECTION */}
        <div className="glass-card p-8 sticky top-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {enquiryId ? 'Update Lead' : 'New Enquiry'}
          </h2>
          <form className="space-y-5" onSubmit={saveEnquiry}>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-4 text-slate-400" />
                <input className="input-style pl-10" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required placeholder="John Doe" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-4 text-slate-400" />
                <input type="email" className="input-style pl-10" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Phone Number</label>
              <div className="relative">
                <HiPhone className="absolute left-3 top-4 text-slate-400" />
                <input className="input-style pl-10" value={formData.phone} onChange={(e)=>setFormData({...formData, phone:e.target.value})} required placeholder="+91..." />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Message</label>
              <div className="relative">
                <HiChatAlt2 className="absolute left-3 top-3 text-slate-400" />
                <textarea className="input-style pl-10 h-32" value={formData.message} onChange={(e)=>setFormData({...formData, message:e.target.value})} required placeholder="How can we help?" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
              {enquiryId ? 'Update Enquiry' : 'Register Lead'}
            </button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="glass-card p-2 overflow-hidden">
          <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} editRow={(item) => { setFormData(item); setEnquiryId(item._id); window.scrollTo(0,0); }} /> 
        </div>
      </div>
    </div>
  );
}