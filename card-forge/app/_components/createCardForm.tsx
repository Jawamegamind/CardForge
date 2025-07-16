'use client'

import { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import { createClient } from '@/utils/supabase/client'

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

interface BusinessCard {
  id: string
  name: string
  title: string
  company: string
  phone: string
  email: string
  website: string
  address: string
  logo_text: string
  template: string
  created_at: string
}

interface CreateCardFormProps {
  onSaveSuccess?: () => void
  editCard?: BusinessCard | null
  mode?: 'create' | 'edit'
}

export default function CreateCardForm({ onSaveSuccess, editCard, mode = 'create' }: CreateCardFormProps) {
  const [formData, setFormData] = useState<CardData>({
    name: editCard?.name || '',
    title: editCard?.title || '',
    company: editCard?.company || '',
    phone: editCard?.phone || '',
    email: editCard?.email || '',
    website: editCard?.website || '',
    address: editCard?.address || '',
    logoText: editCard?.logo_text || ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const cardRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Update form data when editCard changes
  useEffect(() => {
    if (editCard) {
      setFormData({
        name: editCard.name || '',
        title: editCard.title || '',
        company: editCard.company || '',
        phone: editCard.phone || '',
        email: editCard.email || '',
        website: editCard.website || '',
        address: editCard.address || '',
        logoText: editCard.logo_text || ''
      })
    } else {
      // Reset form for create mode
      setFormData({
        name: '',
        title: '',
        company: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        logoText: ''
      })
    }
    setSaveStatus('idle') // Reset save status when mode changes
  }, [editCard, mode])

  const handleInputChange = (field: keyof CardData, value: string) => {
    setFormData({ ...formData, [field]: value })
    setSaveStatus('idle') // Reset save status when user edits
  }

  const handleSaveCard = async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error('User not authenticated')
      }

      const cardData = {
        user_id: user.id,
        name: formData.name,
        title: formData.title,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        address: formData.address,
        logo_text: formData.logoText,
        template: 'modern' // Default template for now
      }

      let data, error

      if (mode === 'edit' && editCard) {
        // Update existing card
        const result = await supabase
          .from('business_cards')
          .update(cardData)
          .eq('id', editCard.id)
          .eq('user_id', user.id) // Ensure user can only edit their own cards
          .select()
        
        data = result.data
        error = result.error
      } else {
        // Insert new card
        const result = await supabase
          .from('business_cards')
          .insert([cardData])
          .select()
        
        data = result.data
        error = result.error
      }

      if (error) {
        throw error
      }

      setSaveStatus('success')
      console.log(`Card ${mode === 'edit' ? 'updated' : 'saved'} successfully:`, data)
      
      // Call the callback to refresh the dashboard
      if (onSaveSuccess) {
        onSaveSuccess()
      }

      // Reset form after successful save
      setTimeout(() => {
        setFormData({
          name: '',
          title: '',
          company: '',
          phone: '',
          email: '',
          website: '',
          address: '',
          logoText: ''
        })
        setSaveStatus('idle')
      }, 2000)

    } catch (error) {
      console.error('Error saving card:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
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

        {/* Save Status Alert */}
        {saveStatus === 'success' && (
          <div className="alert alert-success">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{mode === 'edit' ? 'Card updated successfully!' : 'Card saved successfully!'}</span>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="alert alert-error">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Error saving card. Please try again.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          {/* Save Button */}
          <button 
            onClick={handleSaveCard} 
            className={`btn btn-primary w-full ${isSaving ? 'loading' : ''}`}
            disabled={isSaving || !formData.name.trim()}
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                {mode === 'edit' ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {mode === 'edit' ? 'Update Business Card' : 'Save Business Card'}
              </>
            )}
          </button>

          {/* Download Buttons */}
          <div className="flex gap-4">
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
                    <h3 className="text-lg font-bold text-gray-800 tracking-wide truncate" title={formData.company || 'COMPANY NAME'}>
                      {formData.company || 'COMPANY NAME'}
                    </h3>
                    <p className="text-xs text-gray-600 tracking-widest">
                      YOUR TAGLINE HERE
                    </p>
                  </div>
                </div>
                
                {/* Website */}
                <div className="text-xs text-gray-600 mt-auto mb-4 truncate" title={formData.website || 'www.website.com'}>
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
                    <h2 className="text-base font-bold text-gray-800 truncate" title={formData.name || 'John Doe'}>
                      {formData.name || 'John Doe'}
                    </h2>
                    <p className="text-sm text-gray-600 truncate" title={formData.title || 'Creative Director'}>
                      {formData.title || 'Creative Director'}
                    </p>
                  </div>
                  
                  {/* Contact Details */}
                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="truncate">{formData.phone || '+1 234 567 8900'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="truncate" title={formData.email || 'john@company.com'}>
                        {formData.email || 'john@company.com'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs leading-tight truncate" title={formData.address || '123 Business St, City, State'}>
                        {formData.address || '123 Business St, City, State'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="truncate" title={formData.website || 'www.company.com'}>
                        {formData.website || 'www.company.com'}
                      </span>
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
