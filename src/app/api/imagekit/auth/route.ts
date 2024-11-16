import ImageKit from "imagekit"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
  // !

  const ik = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    privateKey: process.env.PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
  })

  return Response.json(ik.getAuthenticationParameters())
}

export const DELETE = async (req: NextRequest) => {
  const ik = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    privateKey: process.env.PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
  })

  // Read and parse the body as JSON
  const body = await req.json() // This parses the ReadableStream to a JS object

  const fileId = body.fileId
  console.log("fileId", fileId)

  // Proceed with your logic using the fileId
  if (!fileId) {
    return new Response("File ID is required", { status: 400 })
  }

  try {
    const response = await ik.deleteFile(fileId)
    return NextResponse.json(
      {
        msg: "Success",
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to delete image", error },
      {
        status: 500,
      }
    )
  }
}
