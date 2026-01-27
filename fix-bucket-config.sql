-- Update the Bright_elv bucket to allow PDF files
-- This connects to the internal storage schema of Supabase

UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
    'image/jpeg', 
    'image/png', 
    'image/jpg', 
    'image/webp', 
    'image/svg+xml',
    'application/pdf'
]
WHERE id = 'Bright_elv';

-- Verify the change
SELECT id, allowed_mime_types FROM storage.buckets WHERE id = 'Bright_elv';
