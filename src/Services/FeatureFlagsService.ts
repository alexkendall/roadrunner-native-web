import { ref, getBytes, getDownloadURL } from 'firebase/storage'
import { initializeAuth, storage } from '../Config/Firebase'

export type FeatureFlags = Record<string, boolean>

export type FeatureFlagsResponse = {
  flags: FeatureFlags
  updatedAt?: string
}

const FEATURE_FLAGS_PATH = 'Feature-Flags/feature_flags.json'

export async function fetchFeatureFlags(): Promise<FeatureFlagsResponse> {
  try {
    // Ensure user is authenticated for Storage requests.
    const user = await initializeAuth()
    if (!user) throw new Error('User authentication failed')
    await user.getIdToken()

    const fileRef = ref(storage, FEATURE_FLAGS_PATH)

    try {
      const bytes = await getBytes(fileRef)
      const text = new TextDecoder('utf-8').decode(bytes)
      return JSON.parse(text) as FeatureFlagsResponse
    } catch (e) {
      // Fallback: attempt download URL fetch if getBytes fails.
      const downloadURL = await getDownloadURL(fileRef)
      const resp = await fetch(downloadURL)
      if (!resp.ok) {
        throw new Error(`Failed to download "${FEATURE_FLAGS_PATH}" (${resp.status})`)
      }
      return (await resp.json()) as FeatureFlagsResponse
    }
  } catch (error: any) {
    console.error('Error fetching feature flags from Firebase Storage:', error)
    throw error
  }
}

