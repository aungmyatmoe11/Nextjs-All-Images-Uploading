"use server"

import { ImageModel } from "../../../Schema/Image"
import { dbConnect } from "../lib/db.config"

dbConnect()
export const createImageKit = async (formData: FormData) => {
  const { files } = Object.fromEntries(formData)

  console.log()

  const data = {
    files: JSON.parse(files as string),
    type: "imagekit",
    multiple: true,
    image_url: "imagekit",
    public_id: "imagekit",
  }

  const Image = await ImageModel.create(data)

  return JSON.parse(JSON.stringify(Image))
}
