"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Database file
const dbFilePath = path_1.default.join(__dirname, 'db.json');
// Initialize the submissions database if it doesn't exist
if (!fs_1.default.existsSync(dbFilePath)) {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify([]));
}
// Helper function to read submissions from the JSON file
const readSubmissions = () => {
    try {
        const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
};
module.exports = readSubmissions;
// Helper function to write submissions to the JSON file
const writeSubmissions = (submissions) => {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
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
    const index = parseInt(req.query.index);
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
//# sourceMappingURL=app.js.map