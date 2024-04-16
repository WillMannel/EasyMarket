const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Connect to PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'marketplace',
    password: 'your_password',
    port: 5432,
});

app.use(express.json());

// API to list all products
app.get('/products', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products WHERE available = TRUE');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API for a seller to add a product
app.post('/product', async (req, res) => {
    const { description, price, seller_id } = req.body;
    try {
        await pool.query('INSERT INTO products (description, price, seller_id) VALUES ($1, $2, $3)', [description, price, seller_id]);
        res.status(201).send('Product added');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API for a buyer to buy a product
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE products SET available = FALSE WHERE id = $1', [id]);
        res.send('Product purchased');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
