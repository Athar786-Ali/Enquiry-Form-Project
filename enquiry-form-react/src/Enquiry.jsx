import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from "./enquiry/EnquiryList";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🔥 Backend API Base URL (Vercel)
const API_BASE = "https://backend-enquiry-form-project.vercel.app/api/enquiry";

export default function Enquiry() {

  const [enquiryList, setEnquiryList] = useState([]); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [enquiryId, setEnquiryId] = useState(''); 

  // 1️⃣ SAVE / UPDATE FUNCTION
  const saveEnquiry = (e) => {
    e.preventDefault();
    
    if (enquiryId !== '') {
      // 🔄 UPDATE API
      axios.put(`${API_BASE}/update/${enquiryId}`, formData)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.msg);
          setFormData({ name: '', email: '', phone: '', message: '' });
          setEnquiryId('');
          getAllEnquiry();
        }
      })
      .catch(() => toast.error("Update failed"));
      
    } else {
      // ➕ INSERT API
      axios.post(`${API_BASE}/insert`, formData)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.msg);
          setFormData({ name: '', email: '', phone: '', message: '' });
          getAllEnquiry();
        } else {
          toast.error("Error saving data");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
    }
  };

  // 2️⃣ GET ALL ENQUIRIES
  const getAllEnquiry = () => {
    axios.get(`${API_BASE}/view`)
      .then((res) => {
        if (res.data.status === 1) {
          setEnquiryList(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // 3️⃣ EDIT ROW (FORM ME DATA FILL KARNE KE LIYE)
  const editRow = (currItem) => {
    setFormData(currItem);
    setEnquiryId(currItem._id);
  }

  useEffect(() => {
    getAllEnquiry();
  }, []);

  // FORM VALUE CHANGE
  const getValue = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-8">User Enquiry</h1>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[30%_auto] gap-10">
        
        {/* FORM SECTION */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Enquiry Form</h2>

          <form className="flex flex-col gap-4" onSubmit={saveEnquiry}>
            <div>
              <Label htmlFor="name" value="Your Name" />
              <TextInput id="name" value={formData.name} onChange={getValue} required />
            </div>

            <div>
              <Label htmlFor="email" value="Your Email" />
              <TextInput id="email" value={formData.email} onChange={getValue} required />
            </div>

            <div>
              <Label htmlFor="phone" value="Your Phone" />
              <TextInput id="phone" value={formData.phone} onChange={getValue} required />
            </div>

            <div>
              <Label htmlFor="message" value="Your Message" />
              <Textarea id="message" value={formData.message} onChange={getValue} required rows={4} />
            </div>
            
            <Button type="submit" className="w-full mt-2 bg-[#0e7490] enabled:hover:bg-[#155e75]">
              {enquiryId !== '' ? 'Update' : 'Save'}
            </Button>
          </form>
        </div>

        {/* LIST SECTION */}
        <EnquiryList 
          data={enquiryList} 
          getAllEnquiry={getAllEnquiry} 
          editRow={editRow} 
        /> 
        
      </div>
    </div>
  );
}
