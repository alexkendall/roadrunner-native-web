import { View, ScrollView, Image, Text, Dimensions } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'
import { GoogleDriveVideoEmbed } from '../Components/Common/GoogleDriveVideoEmbed'
import { fetchJsonFilesFromFirebase } from '../Services/FetchJsonFilesFromFirebase'

// Folder name in Firebase Storage. If your bucket uses a different folder name,
// update this constant (e.g. "Sports-Training" vs "SportsTraining").
const FIREBASE_DIRECTORY = 'Sports-Training'

type SportsTrainingItem = {
  /** Used to group content sections. */
  sport?: string
  /** Human-readable title for the drill/content. */
  title?: string
  /** Optional long-form text. */
  description?: string
  /**
   * Video may be either:
   * - drive URL or id string
   * - object with more fields
   */
  video?: string | { driveUrlOrId?: string; title?: string; width?: number; aspectRatio?: number }
  /** Optional images to display (URLs). */
  images?: string[]
  image?: string
  /** Optional ordering within a sport. */
  order?: number
  /** Any other fields we don't explicitly model. */
  [key: string]: unknown
}

export const SportsTraining = () => {
  const [items, setItems] = useState<SportsTrainingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const width = Dimensions.get('window').width

  const videoWidth =   width < 600 ? width - 20 : 560
  const aspectRatio = 16 / 9
  const imageSize = 300

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        setError(null)
        const files = await fetchJsonFilesFromFirebase<unknown>(FIREBASE_DIRECTORY)

        const extracted: SportsTrainingItem[] = []
        for (const f of files) {
          const raw = f.data as any
          if (Array.isArray(raw)) {
            for (const entry of raw) extracted.push(entry as SportsTrainingItem)
          } else if (raw && typeof raw === 'object' && Array.isArray(raw.items)) {
            for (const entry of raw.items) extracted.push(entry as SportsTrainingItem)
          } else if (raw && typeof raw === 'object') {
            extracted.push(raw as SportsTrainingItem)
          }
        }

        setItems(extracted)
      } catch (err) {
        console.error('Failed to load sports training content:', err)
        setError('Failed to load content. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const grouped = useMemo(() => {
    const bySport = new Map<string, SportsTrainingItem[]>()

    for (const item of items) {
      const sport =
        (typeof item.sport === 'string' && item.sport.trim()) ||
        (typeof (item as any).Sport === 'string' && String((item as any).Sport).trim()) ||
        'Other'
      const list = bySport.get(sport) ?? []
      list.push(item)
      bySport.set(sport, list)
    }

    // Sort sports alphabetically and items by order (if present) then title.
    const sports = Array.from(bySport.keys()).sort((a, b) => a.localeCompare(b))
    return sports.map((sport) => {
      const sportItems = (bySport.get(sport) ?? []).slice().sort((a, b) => {
        const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY
        const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY
        if (ao !== bo) return ao - bo
        const at = typeof a.title === 'string' ? a.title : ''
        const bt = typeof b.title === 'string' ? b.title : ''
        return at.localeCompare(bt)
      })
      return { sport, items: sportItems }
    })
  }, [items])

  if (loading) {
    return <LoadingIndicator message="Loading sports training..." />
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 10 }}>
      {grouped.length === 0 ? (
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18 }}>No sports training content found.</Text>
        </View>
      ) : (
        grouped.map(({ sport, items: sportItems }) => {
          return (
            <View key={sport} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 30, margin: 10, fontWeight: 'bold' }}>{sport}</Text>

              {sportItems.map((item, idx) => {
                const title = typeof item.title === 'string' ? item.title : ''
                const description = typeof item.description === 'string' ? item.description : ''

                const video =
                  typeof item.video === 'string'
                    ? { driveUrlOrId: item.video }
                    : item.video && typeof item.video === 'object'
                      ? {
                          driveUrlOrId: (item.video as any).driveUrlOrId,
                          title: (item.video as any).title,
                          width: (item.video as any).width,
                          aspectRatio: (item.video as any).aspectRatio,
                        }
                      : null

                const imageUrls: string[] = []
                if (typeof item.image === 'string' && item.image) imageUrls.push(item.image)
                if (Array.isArray(item.images)) {
                  for (const u of item.images) {
                    if (typeof u === 'string' && u) imageUrls.push(u)
                  }
                }

                return (
                  <View key={`${sport}-${idx}`} style={{ marginBottom: 18 }}>
                    {!!title && <Text style={{ fontSize: 22, margin: 10 }}>{title}</Text>}

                    {video?.driveUrlOrId ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          padding: 10,
                        }}
                      >
                        <GoogleDriveVideoEmbed
                          driveUrlOrId={video.driveUrlOrId}
                          title={video.title || title || 'Sports training video'}
                          width={video.width ?? videoWidth}
                          aspectRatio={video.aspectRatio ?? aspectRatio}
                        />
                      </View>
                    ) : null}

                    {imageUrls.length > 0 ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          padding: 10,
                        }}
                      >
                        {imageUrls.map((url, imageIdx) => (
                          <Image
                            key={`${sport}-${idx}-img-${imageIdx}`}
                            source={{ uri: url }}
                            style={{
                              width: imageSize,
                              height: imageSize,
                              margin: 5,
                              borderWidth: 0.5,
                              borderColor: '#4c4c4c',
                            }}
                          />
                        ))}
                      </View>
                    ) : null}

                    {!!description && (
                      <Text style={{ fontSize: 18, margin: 10, fontWeight: '300' }}>{description}</Text>
                    )}
                  </View>
                )
              })}
            </View>
          )
        })
      )}
    </ScrollView>
  )
}

