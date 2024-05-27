const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUris: [String],
    youtubeUri: String,
    githubUri: String,
    projectUri: String,
    technologies: [String],
    date: { type: Date, default: Date.now }
});

let Project = mongoose.model('Project', projectSchema);

module.exports = Project;