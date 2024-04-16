-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE,
    type VARCHAR(10)  -- 'buyer' or 'seller'
);

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    description TEXT,
    price INTEGER,
    seller_id INTEGER REFERENCES users(id),
    available BOOLEAN DEFAULT TRUE
);

-- Create the purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
-- Insert some example users and products (You may want to change these or remove)
INSERT INTO users (token, type) VALUES ('sellerToken1', 'seller');
INSERT INTO users (token, type) VALUES ('buyerToken1', 'buyer');

INSERT INTO products (description, price, seller_id) VALUES ('Vintage Lamp', 40, 1);
INSERT INTO products (description, price, seller_id) VALUES ('Leather Jacket', 150, 1);
