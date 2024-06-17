const express = require('express');
const bodyParser = require('body-parser');
const VectorDB = require('./db'); // Adjust path as necessary

const app = express();
const port = 3000;
const db = new VectorDB(); // Instantiate VectorDB class

app.use(bodyParser.json());

// Endpoint to add a vector
app.post('/vector', (req, res) => {
    const { id, vector } = req.body;
    if (!id || !vector || !Array.isArray(vector)) {
        return res.status(400).send({ message: 'Invalid request. Please provide id and vector array.' });
    }
    db.addVector(id, vector);
    res.status(201).send({ message: 'Vector added successfully' });
});

// Endpoint to retrieve all vectors
app.get('/vectors', (req, res) => {
    const vectors = db.getAllVectors();
    res.status(200).send(vectors);
});

// Endpoint to retrieve a specific vector by ID
app.get('/vector/:id', (req, res) => {
    const { id } = req.params;
    const vector = db.getVectorById(id);
    if (!vector) {
        return res.status(404).send({ message: 'Vector not found' });
    }
    res.status(200).send(vector);
});

// Endpoint to delete a vector by ID
app.delete('/vector/:id', (req, res) => {
    const { id } = req.params;
    db.deleteVector(id);
    res.status(200).send({ message: 'Vector deleted successfully' });
});

// Endpoint to sort vectors by criteria
app.get('/vectors/sort/:criteria', (req, res) => {
    const { criteria } = req.params;
    try {
        const sortedVectors = db.sortVectors(criteria);
        res.status(200).send(sortedVectors);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Endpoint for vector addition
app.post('/vector/addition', (req, res) => {
    const { vector1, vector2 } = req.body;
    try {
        const result = db.vectorAddition(vector1, vector2);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Endpoint for filtering vectors
app.post('/vectors/filter', (req, res) => {
    const { filterCriteria } = req.body;
    const filteredVectors = db.filterVectors(filterCriteria);
    res.status(200).send(filteredVectors);
});

// Endpoint for advanced search with query parameters
app.get('/vectors/search', (req, res) => {
    const { id, minValue, maxValue } = req.query;
    const results = db.advancedSearch(id, minValue, maxValue);
    res.status(200).send(results);
});

// Default route handling with a minimalist HTML response
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Turbox DB</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    text-align: center;
                    padding: 50px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                }
                p {
                    color: #666;
                    font-size: 1.2rem;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Turbox Vector Database</h1>
                <p>Use appropriate endpoints to interact.</p>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
