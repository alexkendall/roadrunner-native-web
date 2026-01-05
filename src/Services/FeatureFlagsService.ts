import { getBytes, getDownloadURL, ref as storageRef } from 'firebase/storage'
import { doc, getDoc } from 'firebase/firestore'
import { firestore, initializeAuth, storage } from '../Config/Firebase'

export type FeatureFlags = Record<string, boolean>

export type FeatureFlagsResponse = {
  flags: FeatureFlags
  updatedAt?: string
}

const FEATURE_FLAGS_FIRESTORE_PATH: [string, string] = [
  'website_feature_flags',
  'IPwskNOvmo1vvyCO37tC',
]
const FEATURE_FLAGS_STORAGE_PATH = 'Feature-Flags/feature_flags.json'

const isFeatureFlagsResponse = (value: any): value is FeatureFlagsResponse =>
  Boolean(value && typeof value === 'object' && typeof value.flags === 'object')

async function fetchFromDatabase(): Promise<FeatureFlagsResponse> {
  const snapshot = await getDoc(doc(firestore, ...FEATURE_FLAGS_FIRESTORE_PATH))
  if (!snapshot.exists()) {
    const path = FEATURE_FLAGS_FIRESTORE_PATH.join('/')
    console.error(`No feature flags found in Firestore at "${path}"`)
    throw new Error(`No feature flags found in Firestore at "${path}"`)
  }

  const data = snapshot.data()

  if (!isFeatureFlagsResponse(data)) {
    throw new Error('Realtime Database returned unexpected feature flag payload')
  }

  return data
}

async function fetchFromStorage(): Promise<FeatureFlagsResponse> {
  const fileRef = storageRef(storage, FEATURE_FLAGS_STORAGE_PATH)

  try {
    const bytes = await getBytes(fileRef)
    const text = new TextDecoder('utf-8').decode(bytes)
    return JSON.parse(text) as FeatureFlagsResponse
  } catch (e) {
    // Fallback: attempt download URL fetch if getBytes fails.
    const downloadURL = await getDownloadURL(fileRef)
    const resp = await fetch(downloadURL)
    if (!resp.ok) {
      throw new Error(`Failed to download "${FEATURE_FLAGS_STORAGE_PATH}" (${resp.status})`)
    }
    return (await resp.json()) as FeatureFlagsResponse
  }
}

export async function fetchFeatureFlags(): Promise<FeatureFlagsResponse> {
  try {
    // Ensure user is authenticated for Storage requests.
    const user = await initializeAuth()
    if (!user) throw new Error('User authentication failed')
    await user.getIdToken()
    try {
      return await fetchFromDatabase()
    } catch (dbError) {
      console.warn(
        'Realtime Database fetch failed, falling back to Storage feature flags',
        dbError
      )
      return await fetchFromStorage()
    }
  } catch (error: any) {
    console.error('Error fetching feature flags from Firebase:', error)
    throw error
  }
}

