import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload image
export async function uploadToCloudinary(file: File, folderPath: string): Promise<string> {
  try {
    // Convert file to base64
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64File}`;
    
    // Upload to Cloudinary with specified folder path
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `bright-elv/${folderPath}`,
      resource_type: 'auto',
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

// Helper function to delete image
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};

// Helper function to get public ID from URL
export const getPublicIdFromUrl = (url: string) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const folderPath = parts.slice(parts.indexOf('bright-elv')).join('/');
  return folderPath.split('.')[0];
};

export default cloudinary;
