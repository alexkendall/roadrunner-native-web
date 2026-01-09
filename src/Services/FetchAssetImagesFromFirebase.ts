import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage, initializeAuth } from '../Config/Firebase';
import { FirebaseAssetContentType } from '../Types/FirebaseAssetContentType';

/**
 * Fetches all asset images from Firebase Storage
 * Images should be stored in the 'directory' folder in your Storage bucket
 * Images are sorted by date added (newest first)
 */
export const fetchAssetImagesFromFirebase = async (directory: string): Promise<FirebaseAssetContentType[]> => {
  try {
    // Ensure user is authenticated
    const user = await initializeAuth();
    
    if (!user) {
      throw new Error('User authentication failed');
    }
    
    // Wait for the ID token to be available (ensures auth token is ready for Storage requests)
    await user.getIdToken();

    // Create a reference to the directory folder
    const photographyRef = ref(storage, directory);

    // List all items in the directory folder
    const result = await listAll(photographyRef);

    // Get download URLs and metadata for all items
    const imagePromises: Promise<FirebaseAssetContentType>[] = result.items.map(async (itemRef) => {
      const [downloadURL, metadata] = await Promise.all([
        getDownloadURL(itemRef),
        getMetadata(itemRef)
      ]);
      return {
        image: downloadURL,
        timeCreated: metadata.timeCreated ? new Date(metadata.timeCreated).getTime() : 0,
      } satisfies FirebaseAssetContentType;
    });

    const images = await Promise.all(imagePromises);

    // Sort by date added (newest first)
    const sortedImages = images.sort((a, b) => b.timeCreated - a.timeCreated);

    return sortedImages;
  } catch (error: any) {
    console.error('Error fetching photography images:', error);
    
    // Provide more detailed error information
    if (error?.code === 'storage/unauthorized') {
      console.error('❌ Storage access denied. Check your Firebase Storage rules.');
      throw new Error('Access denied. Please check Firebase Storage security rules.');
    } else if (error?.code === 'storage/object-not-found') {
      console.error(`❌ ${directory} folder not found in Storage.`);
      throw new Error(`${directory} folder not found in Storage.`);
    } else if (error?.code === 'storage/quota-exceeded') {
      console.error('❌ Storage quota exceeded.');
      throw new Error('Storage quota exceeded.');
    } else if (error?.code === 'auth/network-request-failed') {
      console.error('❌ Network error. Check your internet connection.');
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
};

