import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage, initializeAuth } from '../Config/Firebase';

export interface CaseStudyImageType {
  image: string;
  timeCreated: number;
}

/**
 * Fetches all case study images from Firebase Storage
 * Images should be stored in the 'Case-Studies' folder in your Storage bucket
 * Images are sorted by date added (newest first)
 */
export const fetchCaseStudyImages = async (): Promise<CaseStudyImageType[]> => {
  try {
    // Ensure user is authenticated
    const user = await initializeAuth();
    
    if (!user) {
      throw new Error('User authentication failed');
    }
    
    // Wait for the ID token to be available (ensures auth token is ready for Storage requests)
    await user.getIdToken();
    console.log('Auth token obtained, user ID:', user.uid);

    // Create a reference to the Case-Studies folder
    const caseStudiesRef = ref(storage, 'Case-Studies');
    console.log('Listing items in Case-Studies folder...');

    // List all items in the Case-Studies folder
    const result = await listAll(caseStudiesRef);
    console.log(`Found ${result.items.length} items in Case-Studies folder`);

    // Get download URLs and metadata for all items
    const imagePromises = result.items.map(async (itemRef) => {
      const [downloadURL, metadata] = await Promise.all([
        getDownloadURL(itemRef),
        getMetadata(itemRef)
      ]);
      return {
        image: downloadURL,
        timeCreated: metadata.timeCreated ? new Date(metadata.timeCreated).getTime() : 0,
      };
    });

    const images = await Promise.all(imagePromises);

    // Sort by date added (latest first)
    const sortedImages = images.sort((a, b) => a.timeCreated - b.timeCreated);

    return sortedImages;
  } catch (error: any) {
    console.error('Error fetching case study images:', error);
    
    // Provide more detailed error information
    if (error?.code === 'storage/unauthorized') {
      console.error('❌ Storage access denied. Check your Firebase Storage rules.');
      throw new Error('Access denied. Please check Firebase Storage security rules.');
    } else if (error?.code === 'storage/object-not-found') {
      console.error('❌ Case-Studies folder not found in Storage.');
      throw new Error('Case-Studies folder not found in Storage.');
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

