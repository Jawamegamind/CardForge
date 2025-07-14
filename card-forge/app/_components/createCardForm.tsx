'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

interface CardData {
  name: string
  title: string
  company: string
  phone: string
  email: string
  website: string
  address: string
  logoText: string
}

export default function CreateCardForm() {
  const [formData, setFormData] = useState<CardData>({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    logoText: ''
  })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof CardData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleDownloadImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3,
        width: 350,
        height: 200
      })
      const link = document.createElement('a')
      link.download = 'business_card.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleDownloadPDF = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3,
        width: 350,
        height: 200
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', [89, 51]) // Standard business card size
      pdf.addImage(imgData, 'PNG', 0, 0, 89, 51)
      pdf.save('business_card.pdf')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-semibold">Job Title</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Creative Director"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Company Name</span>
          </label>
          <input
            className="input input-bordered w-full"
            placeholder="Your Company Inc."
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Company Logo Text/Initials</span>
          </label>
          <input
            className="input input-bordered w-full"
            placeholder="YC"
            value={formData.logoText}
            onChange={(e) => handleInputChange('logoText', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Phone Number</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="+1 234 567 8900"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Website</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="www.company.com"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="123 Business St, City, State"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={handleDownloadImage} className="btn btn-accent flex-1">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Download PNG
          </button>
          <button onClick={handleDownloadPDF} className="btn btn-secondary flex-1">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative">
          {/* Business Card */}
          <div
            ref={cardRef}
            className="bg-white shadow-2xl border border-gray-100"
            style={{
              width: '350px',
              height: '200px',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            {/* Front Side */}
            <div className="w-full h-full flex relative overflow-hidden">
              {/* Left Section - Company Info */}
              <div className="w-1/2 bg-white flex flex-col justify-center pl-6 relative">
                {/* Company Logo/Text */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-400 rounded-full mb-2">
                    <span className="text-white font-bold text-lg">
                      {formData.logoText || 'YC'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 tracking-wide">
                      {formData.company || 'COMPANY NAME'}
                    </h3>
                    <p className="text-xs text-gray-600 tracking-widest">
                      YOUR TAGLINE HERE
                    </p>
                  </div>
                </div>
                
                {/* Website */}
                <div className="text-xs text-gray-600 mt-auto mb-4">
                  {formData.website || 'www.website.com'}
                </div>
              </div>

              {/* Right Section - Contact Info */}
              <div className="w-1/2 bg-gray-50 flex flex-col justify-center px-4 relative">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
                
                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="mb-3">
                    <h2 className="text-base font-bold text-gray-800">
                      {formData.name || 'John Doe'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {formData.title || 'Creative Director'}
                    </p>
                  </div>
                  
                  {/* Contact Details */}
                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span>{formData.phone || '+1 234 567 8900'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span>{formData.email || 'john@company.com'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs leading-tight">
                        {formData.address || '123 Business St, City, State'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span>{formData.website || 'www.company.com'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400"></div>
              </div>
            </div>
          </div>
          
          {/* Card Dimensions Label */}
          <div className="text-center mt-2 text-xs text-gray-500">
            3.5" × 2" (Standard Business Card Size)
          </div>
        </div>
      </div>
    </div>
  )
}
