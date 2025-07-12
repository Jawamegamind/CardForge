'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function CreateCardForm() {
  const [formData, setFormData] = useState({ name: '', title: '', company: '' })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownloadImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current)
      const link = document.createElement('a')
      link.download = 'business_card.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleDownloadPDF = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 90)
      pdf.save('business_card.pdf')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form */}
      <div className="flex-1 space-y-4">
        <input
          className="input input-bordered w-full"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <div className="flex gap-4">
          <button onClick={handleDownloadImage} className="btn btn-accent">Download PNG</button>
          <button onClick={handleDownloadPDF} className="btn btn-secondary">Download PDF</button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={cardRef}
          className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content p-6 w-80 h-48 shadow-lg flex flex-col justify-center"
        >
          <h2 className="text-xl font-bold">{formData.name || 'Full Name'}</h2>
          <p className="opacity-80">{formData.title || 'Job Title'}</p>
          <p className="opacity-80">{formData.company || 'Company'}</p>
        </div>
      </div>
    </div>
  )
}
