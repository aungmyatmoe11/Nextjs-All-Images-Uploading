import { IKContext, IKUpload } from "imagekitio-react"
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props"
import React from "react"

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
export default function ImagekitUploader(props: IKUploadProps) {
  return (
    <div>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={async () => {
          const response = await fetch("/api/imagekit/auth")

          return await response.json()
        }}
      >
        <IKUpload {...props} />
      </IKContext>
    </div>
  )
}
