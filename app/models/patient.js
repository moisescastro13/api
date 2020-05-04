const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PatientSchema = new mongoose.Schema({
    
    dui: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true, 
        required: true
    },
    DiseaseRef:[{
        type : Schema.ObjectId,
        ref: "Disease"
    }],
    StateRef:{
        type : Schema.ObjectId,
        ref: "State"
    },
    Age: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Patient = mongoose.model('Patient',PatientSchema);

module.exports = Patient;
