import supabase from '../config/db';

const BUCKET_NAME = 'Bright_elv'; // Ensure this bucket exists in your Supabase Storage and is set to Public

// Helper to upload a file to Supabase Storage
export async function uploadToStorage(file: File, folder: string): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and append timestamp
    const name = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const path = `${folder}/${Date.now()}-${name}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return publicUrl;
  } catch (error) {
    console.error('Upload helper error:', error);
    throw new Error('Failed to upload image');
  }
}

// Helper to delete a file from Supabase Storage
export async function deleteFromStorage(url: string): Promise<void> {
  if (!url) return;

  try {
    // Extract path from URL. 
    // Format: .../storage/v1/object/public/images/folder/file.jpg
    const parts = url.split(`${BUCKET_NAME}/`);
    if (parts.length < 2) {
      console.warn('Invalid Supabase Storage URL:', url);
      return;
    }

    const path = parts[1]; // content after bucket name

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error(`Storage delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Delete helper error:', error);
    throw new Error('Failed to delete image');
  }
}
