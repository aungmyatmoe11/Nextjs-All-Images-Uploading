import mongoose from "mongoose"

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log(`DB connection is connect with ${mongoose.connection.host}`)
  } catch (error) {
    mongoose.disconnect()
    process.exit(1)
  }
}
