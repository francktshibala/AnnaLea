-- Anna Lea Books Database Schema
-- This file contains the complete database schema for the book website
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create books table
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL DEFAULT 'Anna Lea Cannon',
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('christian', 'inspirational', 'historical', 'children', 'romance', 'mystery')),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    featured BOOLEAN DEFAULT FALSE,
    isbn VARCHAR(20),
    pages INTEGER CHECK (pages > 0),
    publication_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    stripe_payment_intent_id VARCHAR(255),
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    subscribed BOOLEAN DEFAULT TRUE,
    source VARCHAR(100), -- 'website', 'checkout', 'manual', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_featured ON books(featured) WHERE featured = TRUE;
CREATE INDEX idx_books_created_at ON books(created_at DESC);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_book_id ON order_items(book_id);
CREATE INDEX idx_reviews_book_id ON reviews(book_id);
CREATE INDEX idx_reviews_approved ON reviews(approved) WHERE approved = TRUE;
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON newsletter_subscribers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for books (public read access)
CREATE POLICY "Books are viewable by everyone" ON books
    FOR SELECT USING (true);

-- Create RLS policies for orders (customers can only see their own orders)
CREATE POLICY "Customers can view their own orders" ON orders
    FOR SELECT USING (auth.jwt() ->> 'email' = customer_email);

CREATE POLICY "Customers can insert their own orders" ON orders
    FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = customer_email);

-- Create RLS policies for order_items (linked to orders policy)
CREATE POLICY "Order items viewable by order owner" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.customer_email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Order items insertable by order owner" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.customer_email = auth.jwt() ->> 'email'
        )
    );

-- Create RLS policies for reviews (public read, authenticated write)
CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can submit reviews" ON reviews
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for newsletter (public insert only)
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Insert sample data for Anna Lea's books
INSERT INTO books (title, author, price, description, image_url, category, stock_quantity, featured, isbn, pages, publication_date) VALUES
(
    'Isaiah Tree: The Olive Tree That Jesus Touched',
    'Anna Lea Cannon',
    12.99,
    'A heartwarming tale of hope and faith centered around an ancient olive tree that witnessed Christ''s presence. Follow Isaiah Tree''s journey as it experiences divine connection and learns about the endurance of hope, miracles in everyday life, and love''s divine power.',
    '/images/books/isaiah-tree-cover.png',
    'christian',
    500,
    true,
    '978-1234567890',
    150,
    '2023-03-15'
),
(
    'Sweet Fruit: The Palm Tree That Was Touched by Jesus',
    'Anna Lea Cannon',
    11.99,
    'Journey with Sweet Fruit, a date palm, through loss and renewal as it experiences Christ''s triumphal entry. A story of resilience in adversity, the power of community, and healing and restoration that celebrates Palm Sunday.',
    '/images/books/sweet-fruit-cover.jpg',
    'christian',
    300,
    true,
    '978-1234567891',
    140,
    '2023-08-20'
),
(
    'A Missionary Widow: The Enduring Power of Faith and Love',
    'Anna Lea Cannon',
    14.99,
    'The inspiring true story of Pete and Suzanne Black''s love story through missionary service. A testament to faith commitment, family bonds, and the power of love that endures through all circumstances.',
    '/images/books/missionary-widow-cover.png',
    'inspirational',
    200,
    true,
    '978-1234567892',
    220,
    '2024-01-10'
);

-- Insert sample newsletter subscribers
INSERT INTO newsletter_subscribers (email, name, source) VALUES
('reader1@example.com', 'Mary Johnson', 'website'),
('reader2@example.com', 'David Smith', 'checkout'),
('reader3@example.com', 'Sarah Williams', 'website');

-- Create view for book statistics
CREATE VIEW book_stats AS
SELECT 
    b.id,
    b.title,
    b.price,
    b.stock_quantity,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count,
    COALESCE(SUM(oi.quantity), 0) as total_sold
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id AND r.approved = true
LEFT JOIN order_items oi ON b.id = oi.book_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status IN ('processing', 'shipped', 'delivered')
GROUP BY b.id, b.title, b.price, b.stock_quantity;

-- Grant permissions for the view
GRANT SELECT ON book_stats TO anon, authenticated;

-- Create function to get featured books
CREATE OR REPLACE FUNCTION get_featured_books()
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    author VARCHAR,
    price DECIMAL,
    description TEXT,
    image_url TEXT,
    category VARCHAR,
    average_rating DECIMAL,
    review_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.title,
        b.author,
        b.price,
        b.description,
        b.image_url,
        b.category,
        COALESCE(AVG(r.rating), 0)::DECIMAL as average_rating,
        COUNT(r.id) as review_count
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id AND r.approved = true
    WHERE b.featured = true AND b.stock_quantity > 0
    GROUP BY b.id, b.title, b.author, b.price, b.description, b.image_url, b.category
    ORDER BY b.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_featured_books() TO anon, authenticated;