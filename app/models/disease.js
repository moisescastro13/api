const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name_disease: {
        type: String,
        unique: true,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const Disease = mongoose.model('Disease',DiseaseSchema);

module.exports = Disease;