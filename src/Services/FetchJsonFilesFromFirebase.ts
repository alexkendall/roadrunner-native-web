import { ref, listAll, getDownloadURL, getMetadata, getBytes } from 'firebase/storage'
import { initializeAuth, storage } from '../Config/Firebase'

export type FirebaseJsonFile<T = unknown> = {
  name: string
  fullPath: string
  timeCreated: number
  data: T
}

/**
 * Fetch all JSON files from a Firebase Storage directory.
 * Files are sorted by timeCreated (newest first).
 */
export async function fetchJsonFilesFromFirebase<T = unknown>(directory: string): Promise<FirebaseJsonFile<T>[]> {
  try {
    // Ensure user is authenticated for Storage requests.
    const user = await initializeAuth()
    if (!user) throw new Error('User authentication failed')
    await user.getIdToken()

    const dirRef = ref(storage, directory)
    const result = await listAll(dirRef)

    const jsonItems = result.items.filter((item) => item.name.toLowerCase().endsWith('.json'))

    console.log('jsonItems', jsonItems)

    const filePromises = jsonItems.map(async (itemRef) => {
      const [downloadURL, metadata] = await Promise.all([getDownloadURL(itemRef), getMetadata(itemRef)])

      console.log('downloadURL', downloadURL)
      // Prefer Storage SDK reads over plain fetch(downloadURL).
      // Some objects may not have a public download token, causing downloadURL fetches to 403 on web.
      let data: T
      try {
        const bytes = await getBytes(itemRef)
        const text = new TextDecoder('utf-8').decode(bytes)
        data = JSON.parse(text) as T
      } catch (e) {
        // Fallback: if getBytes fails for any environment-specific reason, try downloadURL fetch.
        const resp = await fetch(downloadURL as string)
        if (!resp.ok) {
          throw new Error(`Failed to download "${itemRef.fullPath}" (${resp.status})`)
        }
        data = (await resp.json()) as T
      }

      console.log('data', data)

      console.log("itemRef", itemRef)

      return {
        name: itemRef.name,
        fullPath: itemRef.fullPath,
        timeCreated: metadata.timeCreated ? new Date(metadata.timeCreated).getTime() : 0,
        data,
      } satisfies FirebaseJsonFile<T>
    })

    const files = await Promise.all(filePromises)
    return files.sort((a, b) => b.timeCreated - a.timeCreated)
  } catch (error: any) {
    console.error('Error fetching JSON files from Firebase:', error)

    if (error?.code === 'storage/unauthorized') {
      throw new Error('Access denied. Please check Firebase Storage security rules.')
    }
    if (error?.code === 'storage/object-not-found') {
      throw new Error(`${directory} folder not found in Storage.`)
    }
    if (error?.code === 'storage/quota-exceeded') {
      throw new Error('Storage quota exceeded.')
    }
    if (error?.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your connection.')
    }

    throw error
  }
}


