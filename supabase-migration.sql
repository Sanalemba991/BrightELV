-- Supabase Migration Script for Bright ELV
-- Run this script in your Supabase SQL Editor to create the required tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(500),
    display_type VARCHAR(50) DEFAULT 'subcategories' CHECK (display_type IN ('subcategories', 'products')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- SubCategories Table
CREATE TABLE IF NOT EXISTS subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT,
    image VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    meta_robots VARCHAR(100) DEFAULT 'index, follow',
    canonical_url VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_subcategories_category ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_slug ON subcategories(slug);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    key_features TEXT[], -- Array of strings
    image1 VARCHAR(500) NOT NULL,
    image2 VARCHAR(500),
    image3 VARCHAR(500),
    image4 VARCHAR(500),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    meta_robots VARCHAR(100) DEFAULT 'index, follow',
    canonical_url VARCHAR(500),
    structured_data JSONB,
    faq_schema JSONB, -- Array of {question, answer}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);

-- Product Enquiries Table
CREATE TABLE IF NOT EXISTS product_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_product_enquiries_status ON product_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_product_enquiries_created_at ON product_enquiries(created_at DESC);

-- Product Inquiries Table (separate from enquiries)
CREATE TABLE IF NOT EXISTS product_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    message TEXT,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_product_inquiries_status ON product_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_product_inquiries_product ON product_inquiries(product_id);
CREATE INDEX IF NOT EXISTS idx_product_inquiries_created_at ON product_inquiries(created_at DESC);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust based on your needs)
-- Categories - public read
CREATE POLICY "Allow public read access to categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to categories" ON categories
    FOR ALL USING (auth.role() = 'service_role');

-- SubCategories - public read
CREATE POLICY "Allow public read access to subcategories" ON subcategories
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to subcategories" ON subcategories
    FOR ALL USING (auth.role() = 'service_role');

-- Products - public read
CREATE POLICY "Allow public read access to products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to products" ON products
    FOR ALL USING (auth.role() = 'service_role');

-- Contacts - only service role (admin)
CREATE POLICY "Allow service role full access to contacts" ON contacts
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public insert to contacts" ON contacts
    FOR INSERT WITH CHECK (true);

-- Subscriptions - public insert, service role for management
CREATE POLICY "Allow public insert to subscriptions" ON subscriptions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access to subscriptions" ON subscriptions
    FOR ALL USING (auth.role() = 'service_role');

-- Product Enquiries - public insert, service role for management
CREATE POLICY "Allow public insert to product_enquiries" ON product_enquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access to product_enquiries" ON product_enquiries
    FOR ALL USING (auth.role() = 'service_role');

-- Product Inquiries - public insert, service role for management
CREATE POLICY "Allow public insert to product_inquiries" ON product_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access to product_inquiries" ON product_inquiries
    FOR ALL USING (auth.role() = 'service_role');
