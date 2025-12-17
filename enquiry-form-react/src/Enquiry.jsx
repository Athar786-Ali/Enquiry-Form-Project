import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from "./enquiry/EnquiryList";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Update ke liye ID store karne ka state
  const [enquiryId, setEnquiryId] = useState(''); 

  // 1. Save / Update Function
  const saveEnquiry = (e) => {
    e.preventDefault();
    
    // Agar ID hai toh UPDATE karein, nahi toh INSERT karein
    if(enquiryId !== '') {
        // Update API Call
        axios.put(`http://localhost:8000/api/enquiry/update/${enquiryId}`, formData)
        .then((res) => {
            if(res.data.status === 1){
                toast.success(res.data.msg);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setEnquiryId(''); // ID wapas khali kar do
                getAllEnquiry();
            }
        })
        .catch((error) => {
             toast.error("Update failed");
        });
    } else {
        // Insert API Call (Purana logic)
        axios.post('http://localhost:8000/api/enquiry/insert', formData)
        .then((res) => {
            if(res.data.status === 1){
                toast.success(res.data.msg);
                setFormData({ name: '', email: '', phone: '', message: '' });
                getAllEnquiry();
            } else {
                toast.error("Error saving data");
            }
        })
        .catch((error) => {
            toast.error("Something went wrong!");
        });
    }
  };

  // 2. Get Function
  const getAllEnquiry = () => {
    axios.get('http://localhost:8000/api/enquiry/view')
      .then((res) => {
        if(res.data.status === 1){
            setEnquiryList(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // 3. Edit Row Function (Ye data form mein bharega)
  const editRow = (currItem) => {
     setFormData(currItem); // Pura data form mein daal do
     setEnquiryId(currItem._id); // ID set kar do taaki Update mode on ho jaye
  }

  useEffect(() => {
    getAllEnquiry();
  }, []);

  const getValue = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-8">User Enquiry</h1>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[30%_auto] gap-10">
        
        {/* Form Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Enquiry Form</h2>
          <form className="flex flex-col gap-4" onSubmit={saveEnquiry}>
            <div>
              <Label htmlFor="name" value="Your Name" className="mb-2 block font-medium" />
              <TextInput id="name" value={formData.name} onChange={getValue} type="text" placeholder="Enter Your Name" required />
            </div>
            <div>
              <Label htmlFor="email" value="Your Email" className="mb-2 block font-medium" />
              <TextInput id="email" value={formData.email} onChange={getValue} type="email" placeholder="Enter Your Email" required />
            </div>
            <div>
              <Label htmlFor="phone" value="Your phone" className="mb-2 block font-medium" />
              <TextInput id="phone" value={formData.phone} onChange={getValue} type="tel" placeholder="Enter Your phone" required />
            </div>
            <div>
              <Label htmlFor="message" value="Your Message" className="mb-2 block font-medium" />
              <Textarea id="message" value={formData.message} onChange={getValue} placeholder="Message..." required rows={4} />
            </div>
            
            <Button type="submit" className="w-full mt-2 bg-[#0e7490] enabled:hover:bg-[#155e75]">
              {/* Button text change hoga condition ke hisaab se */}
              {enquiryId !== '' ? 'Update' : 'Save'}
            </Button>
          </form>
        </div>

        {/* List Section: editRow function pass kiya */}
        <EnquiryList 
            data={enquiryList} 
            getAllEnquiry={getAllEnquiry} 
            editRow={editRow} 
        /> 
        
      </div>
    </div>
  );
}