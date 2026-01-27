-- Add PDF URL column to products table
-- Run this in your Supabase SQL Editor

ALTER TABLE products ADD COLUMN IF NOT EXISTS pdf_url VARCHAR(500);

-- Add comment for clarity
COMMENT ON COLUMN products.pdf_url IS 'Optional PDF document URL for product brochure/documentation';
