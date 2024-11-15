import { dbConnect } from "@/app/lib/db.config"
import { UploadCloudinaryImage } from "@/app/lib/upload-cloudinary-image"
import { NextRequest, NextResponse } from "next/server"
import { ImageModel } from "../../../../Schema/Image"

dbConnect()
export const GET = async (req: NextRequest) => {
  const Images = await ImageModel.find({})

  return NextResponse.json(
    { images: Images, total: Images.length },
    {
      status: 200,
    }
  )
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()

  const image = formData.get("image") as unknown as File
  console.log({ image })

  const data: any = await UploadCloudinaryImage(image, "nextjs-image-gallery")

  await ImageModel.create({
    image_url: data?.secure_url,
    public_id: data?.public_id,
    type: "cloudinary",
  })

  return NextResponse.json(
    {
      msg: image,
    },
    {
      status: 200,
    }
  )
}
