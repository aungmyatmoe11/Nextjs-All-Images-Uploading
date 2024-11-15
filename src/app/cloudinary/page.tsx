"use client"
import Image from "next/image"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"

export default function Cloudinary() {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<
    {
      image_url: string
      public_id: string
      type: string
      _id: string
    }[]
  >([])

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!image) {
        return
      }

      const formData = new FormData()
      formData.append("image", image)

      const response = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("DATA", data)

      await fetchAllImages()
    } catch (error) {}
  }

  const fetchAllImages = async () => {
    try {
      const response = await fetch("/api/cloudinary")
      const data = await response.json()
      console.log("ALL IMAGES", data)
      setImages(data.images)
    } catch (error) {}
  }

  useEffect(() => {
    fetchAllImages()
  }, [])

  const deleteImage = async (e: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        "/api/cloudinary/" + e.replace("nextjs-image-gallery/", ""),
        {
          method: "DELETE",
        }
      )
      console.log("Delete response", response)
      await fetchAllImages()
    } catch (error: any) {
      console.log("ERROR", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <label htmlFor="cloudinary">Cloudinary Upload</label>
        <input type="file" id="cloudinary" onChange={onHandleChange} />
        <button type="submit">Upload</button>
      </form>

      {images?.map((image, index) => {
        return (
          <div key={index}>
            <Image width={300} height={200} src={image.image_url} alt="Image" />
            <p>Public ID: {image.public_id}</p>
            <button onClick={() => deleteImage(image.public_id)}>
              {loading ? "Loading..." : "Delete"}
            </button>
          </div>
        )
      })}
    </div>
  )
}
