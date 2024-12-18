const express = require('express');
const mongoose = require('mongoose');
const recruiterRoutes = require('./Recruiter/recruiterRoutes');
const seekerRoutes = require('./Seeker/seekerRoutes');
const adminRoutes = require('./Admin/adminRoutes')
const loginRoutes = require('./login/loginRoutes');
const cors = require('cors');

const app = express();



app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(express.json());
app.use(recruiterRoutes);
app.use(seekerRoutes);
app.use(adminRoutes);
app.use(loginRoutes);

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/Creative-Hub", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to DB");
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    })
    .catch(error => {
        console.error("Error connecting to DB", error);
    });
