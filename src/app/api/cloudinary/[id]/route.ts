import { DeleteImage } from "@/app/lib/upload-cloudinary-image"
import { NextRequest, NextResponse } from "next/server"
import { ImageModel } from "../../../../../Schema/Image"
import { dbConnect } from "@/app/lib/db.config"

dbConnect()
export const DELETE = async (
  req: NextRequest,
  ctx: { params: { id: string } }
) => {
  const imagePublicId = `nextjs-image-gallery/` + ctx.params.id

  const result_delete = await DeleteImage(imagePublicId)

  await ImageModel.findOneAndDelete({
    public_id: imagePublicId,
  })

  return NextResponse.json(
    {
      msg: result_delete,
    },
    {
      status: 200,
    }
  )
}
