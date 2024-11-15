import cloudinary from "./cloudinary"

export const UploadCloudinaryImage = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (error, result) => {
          if (error) {
            return reject(error)
          }
          return resolve(result)
        }
      )
      .end(bytes)
  })
}

export const DeleteImage = async (public_id: string) => {
  return new Promise(async (resolve, reject) => {
    // cloudinary.uploader.destroy(public_id, (error, result) => {
    //   if (error) {
    //     return reject(error)
    //   }
    //   return resolve(result)
    // })
    try {
      const result = await cloudinary.uploader.destroy(public_id)
      return resolve(result)
    } catch (error: any) {
      return reject(new Error(error.message))
    }
  })
}
