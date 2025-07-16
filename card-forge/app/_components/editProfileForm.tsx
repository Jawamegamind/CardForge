'use client'

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

interface EditProfileFormProps {
  user: any
  userTable: any
  onUpdate: () => void
}

export default function EditProfileForm({ user, userTable, onUpdate }: EditProfileFormProps) {
  const supabase = createClient()
  const [fullName, setFullName] = useState(userTable?.full_name || "")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      let profile_picture_url = userTable?.profile_picture_url || null

      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Please upload a valid image file')
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('File size must be less than 5MB')
        }

        // Create a consistent filename (this will overwrite the previous avatar)
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}/avatar.${fileExt}`

        setUploadProgress(25)

        // Delete old avatar first if it exists and is different extension
        if (userTable?.profile_picture_url) {
          try {
            const oldPath = userTable.profile_picture_url.split('/storage/v1/object/public/avatars/')[1]
            if (oldPath && oldPath !== fileName) {
              await supabase.storage
                .from("avatars")
                .remove([oldPath])
            }
          } catch (cleanupError) {
            console.warn('Failed to clean up old avatar:', cleanupError)
          }
        }

        setUploadProgress(35)

        // Upload to Supabase Storage with user-specific folder
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, file, { 
            upsert: true,
            cacheControl: '3600' // Cache for 1 hour
          })

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`)
        }

        setUploadProgress(50)

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(uploadData.path)

        profile_picture_url = urlData.publicUrl
        console.log('New profile picture URL:', profile_picture_url) // Debug log

        setUploadProgress(75)
      }

      setUploadProgress(90)

      console.log('Updating user profile for user ID:', user.id) // Debug log
      console.log('Profile data to update:', { 
        full_name: fullName.trim(), 
        profile_picture_url 
      }) // Debug log

      // Update user profile in the database
      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update({ 
            full_name: fullName.trim(), 
            profile_picture_url,
        })
        .eq("user_id", user.id)
        .select()

      if (updateError) {
        throw new Error(`Profile update failed: ${updateError.message}`)
      }

      setUploadProgress(100)

      // Success - call the update callback and close modal
      onUpdate()
      const modal = document.getElementById("edit_profile_modal") as HTMLDialogElement
      modal?.close()

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)
    
    // Show preview info
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file')
        setFile(null)
        return
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        setFile(null)
        return
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <div className="alert alert-error">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Current Profile Picture */}
      {userTable?.profile_picture_url && (
        <div className="text-center">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userTable.profile_picture_url} alt="Current profile" />
            </div>
          </div>
          <p className="text-sm text-base-content/70 mt-2">Current profile picture</p>
        </div>
      )}

      <div>
        <label className="label">
          <span className="label-text font-semibold">Full Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text font-semibold">Profile Picture</span>
          <span className="label-text-alt text-base-content/60">Max 5MB, images only</span>
        </label>
        <input 
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-primary w-full" 
          onChange={handleFileChange}
          disabled={loading}
        />
        {file && (
          <div className="mt-2 p-2 bg-base-200 rounded">
            <p className="text-sm">
              <span className="font-medium">Selected:</span> {file.name}
            </p>
            <p className="text-xs text-base-content/70">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {loading && uploadProgress > 0 && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <progress className="progress progress-primary w-full" value={uploadProgress} max="100"></progress>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
        disabled={loading || !fullName.trim()}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            {uploadProgress > 0 ? 'Uploading...' : 'Updating...'}
          </>
        ) : (
          'Update Profile'
        )}
      </button>
    </div>
  )
}
