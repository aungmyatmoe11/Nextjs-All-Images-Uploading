import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const file = req.body.data // Expecting a base64 string or URL to be uploaded
//       const result = await cloudinary.v2.uploader.upload(file, {
//         folder: "your_folder_name", // Optional: specify a folder
//       })
//       res.status(200).json({ success: true, result })
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message })
//     }
//   } else {
//     res.status(405).json({ success: false, error: "Method not allowed" })
//   }
// }

export default cloudinary
