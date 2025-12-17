import React from 'react'
import { View } from 'react-native'

type Props = {
  /** Accepts a Google Drive "view" URL, "preview" URL, or a raw file id. */
  driveUrlOrId: string
  title?: string
  width?: number
  /** Defaults to 16/9. Height will be computed as width / aspectRatio. */
  aspectRatio?: number
}

function buildDrivePreviewUrl(driveUrlOrId: string): string {
  const input = (driveUrlOrId || '').trim()
  if (!input) return ''

  // If it already looks like a preview URL, keep it.
  if (input.includes('drive.google.com') && input.includes('/preview')) return input

  // Common share formats:
  // - https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
  // - https://drive.google.com/open?id=<FILE_ID>
  const fileIdFromFilePath = input.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1]
  const fileIdFromOpen = input.match(/drive\.google\.com\/open\?id=([^&]+)/)?.[1]

  // If the user passed an id directly, treat it as such.
  const fileId = fileIdFromFilePath || fileIdFromOpen || (input.includes('/') ? '' : input)
  if (!fileId) return ''

  return `https://drive.google.com/file/d/${fileId}/preview`
}

export const GoogleDriveVideoEmbed = ({
  driveUrlOrId,
  title = 'Google Drive video',
  width = 560,
  aspectRatio = 16 / 9,
}: Props) => {
  const src = buildDrivePreviewUrl(driveUrlOrId)
  const height = Math.round(width / aspectRatio)

  if (!src) return null

  // react-native-web will pass this through as a real iframe.
  return (
    <View style={{ width, height, overflow: 'hidden' }}>
      <iframe
        src={src}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
        style={{ display: 'block' }}
      />
    </View>
  )
}

