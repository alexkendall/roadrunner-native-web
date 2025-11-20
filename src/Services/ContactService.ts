import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage, initializeAuth } from '../Config/Firebase';

export interface ContactImageType {
  image: string;
  filename: string;
}

/**
 * Fetches contact images from Firebase Storage
 * Images should be stored in the 'Contact' folder in your Storage bucket
 * Returns a map of filenames (lowercase) to image URLs
 */
export const fetchContactImages = async (): Promise<Map<string, string>> => {
  try {
    // Ensure user is authenticated
    const user = await initializeAuth();
    
    if (!user) {
      throw new Error('User authentication failed');
    }
    
    // Wait for the ID token to be available (ensures auth token is ready for Storage requests)
    await user.getIdToken();
    console.log('Auth token obtained, user ID:', user.uid);

    // Create a reference to the Contact folder
    const contactRef = ref(storage, 'Contact');
    console.log('Listing items in Contact folder...');

    // List all items in the Contact folder
    const result = await listAll(contactRef);
    console.log(`Found ${result.items.length} items in Contact folder`);

    // Get download URLs for all items and create a map by filename (case-insensitive)
    const imagePromises = result.items.map(async (itemRef) => {
      const downloadURL = await getDownloadURL(itemRef);
      // Extract filename from the full path
      const fullPath = itemRef.fullPath;
      const filename = fullPath.split('/').pop() || '';
      return {
        filename: filename.toLowerCase(),
        image: downloadURL,
        originalFilename: filename,
      };
    });

    const images = await Promise.all(imagePromises);

    // Create a map with lowercase filenames as keys
    const imageMap = new Map<string, string>();
    images.forEach(({ filename, image }) => {
      imageMap.set(filename, image);
    });

    return imageMap;
  } catch (error: any) {
    console.error('Error fetching contact images:', error);
    
    // Provide more detailed error information
    if (error?.code === 'storage/unauthorized') {
      console.error('❌ Storage access denied. Check your Firebase Storage rules.');
      throw new Error('Access denied. Please check Firebase Storage security rules.');
    } else if (error?.code === 'storage/object-not-found') {
      console.error('❌ Contact folder not found in Storage.');
      throw new Error('Contact folder not found in Storage.');
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

/**
 * Gets specific contact images by filename (case-insensitive)
 * Returns an object with mailIcon and instagramIcon URLs
 */
export const getContactIcons = async (): Promise<{ mailIcon: string; instagramIcon: string }> => {
  const imageMap = await fetchContactImages();
  
  // Find Mail.png (case-insensitive)
  let mailIcon = '';
  for (const [filename, url] of imageMap.entries()) {
    if (filename === 'mail.png') {
      mailIcon = url;
      break;
    }
  }
  
  if (!mailIcon) {
    throw new Error('Mail.png not found in Contact folder');
  }
  
  // Find instagram.png (case-insensitive)
  let instagramIcon = '';
  for (const [filename, url] of imageMap.entries()) {
    if (filename === 'instagram.png') {
      instagramIcon = url;
      break;
    }
  }
  
  if (!instagramIcon) {
    throw new Error('instagram.png not found in Contact folder');
  }
  
  return { mailIcon, instagramIcon };
};

