import { UploadResponse } from "imagekit/dist/libs/interfaces"
import React from "react"

export default function ImageKitThumbnail({ file }: { file: UploadResponse }) {
  if (file.fileType === "image") {
    return (
      <a href={file.url} target="_blank">
        <img src={file.url + "?tr=w-100,h-100,fo-auto"} alt={file.name} />
      </a>
    )
  }

  return <div>{file.url} &raquo;</div>
}
