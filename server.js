const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const Project = require('./models/Project');

mongoose.connect(process.env.MONGO_URI);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/projects', async(req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`);
});