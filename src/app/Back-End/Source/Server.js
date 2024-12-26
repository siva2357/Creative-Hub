const express = require('express');
const mongoose = require('mongoose');
const recruiterRoutes = require('./Role-based-login/Recruiter/recruiterRoutes');
const seekerRoutes = require('./Role-based-login/Seeker/seekerRoutes');
const adminRoutes = require('./Role-based-login/Admin/adminRoutes');
const loginRoutes = require('./Role-based-login/login/loginRoutes');


const jobPostRoutes = require('./JobPosts/routes/jobPostRoutes');

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

app.use(jobPostRoutes);

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
