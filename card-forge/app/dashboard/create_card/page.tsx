'use client'

// app/dashboard/create/page.tsx
'use client';

import { useState, useRef } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

export default function CreateCardPage() {
  const [cardData, setCardData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: ''
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const downloadAsImage = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const link = document.createElement('a');
      link.download = 'business_card.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadAsPDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 90, 50); // Adjust size as needed
      pdf.save('business_card.pdf');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-base-200">
      <h1 className="text-3xl font-bold mb-4">Create Your Business Card</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <form className="space-y-4">
          {['name', 'title', 'company', 'email', 'phone'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={(cardData as any)[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="input input-bordered w-full"
            />
          ))}
        </form>

        {/* Live Preview */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
          <div ref={previewRef} className="card bg-white text-black w-full p-4 border shadow space-y-1">
            <p className="text-xl font-bold">{cardData.name || 'Your Name'}</p>
            <p>{cardData.title || 'Title'}</p>
            <p>{cardData.company || 'Company'}</p>
            <p>{cardData.email || 'email@example.com'}</p>
            <p>{cardData.phone || '+1234567890'}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <button onClick={downloadAsImage} className="btn btn-primary">Download PNG</button>
            <button onClick={downloadAsPDF} className="btn btn-secondary">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
