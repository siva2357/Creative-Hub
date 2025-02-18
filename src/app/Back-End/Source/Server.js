require('dotenv').config(); // Load .env file at the top

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');

const authRouter = require("./routers/authRoutes");

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
    credentials: true, // Allow credentials (cookies, etc.)
}));

// app.use(cors()); // This allows all origins and methods (use cautiously in production).


app.use(helmet({
    crossOriginResourcePolicy: false, // Avoid blocking frontend requests
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with Error Handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// API Routes
app.use('/api/auth', authRouter);

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: "Hello from the server" });
});

// Start Server with Port Fallback
app.listen(process.env.PORT || 4500, () => {
    console.log(`Server started on port ${process.env.PORT || 4500}`);
});
