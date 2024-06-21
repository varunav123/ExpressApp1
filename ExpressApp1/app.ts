import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database file
const dbFilePath = path.join(__dirname, 'db.json');

// Initialize the submissions database if it doesn't exist
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
}

// Helper function to read submissions from the JSON file
const readSubmissions = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
};
module.exports = readSubmissions;

// Helper function to write submissions to the JSON file
const writeSubmissions = (submissions: any[]): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
};

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Express TypeScript Server!');
});

// Ping route
app.get('/ping', (req, res) => {
    res.json({ success: true });
});

// Submit route
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const submissions = readSubmissions();
    submissions.push({ name, email, phone, github_link, stopwatch_time });
    writeSubmissions(submissions);

    res.status(201).json({ success: true });
});

// Read route
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    const submissions = readSubmissions();

    if (index < 0 || index >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submissions); // Return the entire array of submissions
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
