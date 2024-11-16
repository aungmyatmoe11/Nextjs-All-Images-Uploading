"use client"

import ImageKitThumbnail from "@/components/imagekit-thumbnail"
import ImagekitUploader from "@/components/imagekit-uploader"
import { UploadResponse } from "imagekit/dist/libs/interfaces"
import { IKUpload, ImageKitProvider } from "imagekitio-next"
import { useEffect, useState } from "react"
import { createImageKit } from "../actions/imagekit-actions"

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

export default function ImageKit() {
  const [files, setFiles] = useState<UploadResponse[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    formData.set("files", JSON.stringify(files))
    const result = await createImageKit(formData)

    console.log("result", { result })
  }

  const handleDeleteImage = async (fileId: string) => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/imagekit/auth", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      })

      const result = await response.json()
      if (response.ok) {
        console.log("Image deleted:", result)
        // Remove image from state or perform other UI updates
        const filteredFiles = files.filter((file) => file.fileId !== fileId)

        setFiles(filteredFiles)
        localStorage.setItem("files", JSON.stringify(filteredFiles))
      } else {
        console.error("Failed to delete image:", result)
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    const localFiles = JSON.parse(localStorage.getItem("files") || "[]")
    setFiles(localFiles)
  }, [])

  return (
    <div>
      {/* <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint}>
        <IKUpload />
      </ImageKitProvider> */}
      <form action={handleSubmit}>
        <div>
          <ImagekitUploader
            onUploadStart={() => setIsUploading(true)}
            onSuccess={(file) => {
              localStorage.setItem("files", JSON.stringify([...files, file]))
              setFiles((prev) => [...prev, file])
              setIsUploading(false)
            }}
          />
        </div>
        <button type="submit" disabled={isUploading}>
          Upload
        </button>
      </form>
      <div>
        {files?.map((file, i) => (
          <div key={i}>
            <ImageKitThumbnail file={file} />
            <button
              type="button"
              onClick={() => handleDeleteImage(file.fileId)}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
