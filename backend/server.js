const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());

const origin1 = process.env.ORIGIN1?.replace(/\/+$/, ''); // Remove trailing slash
const origin2 = process.env.ORIGIN2?.replace(/\/+$/, '');
const origin3 = process.env.ORIGIN3?.replace(/\/+$/, '');

const allowedOrigins = [origin1, origin2, origin3].filter(Boolean); // Filter out any undefined values

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        console.log("Request origin: ", origin);
        if (allowedOrigins.indexOf(origin?.replace(/\/+$/, '')) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/transcripts', require('./routes/transcriptRoutes'));

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
    connectDB(); // Database connection after the server starts
});
