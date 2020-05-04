const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    name_state: {
        type: String,
        unique: true,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const State = mongoose.model('State',StateSchema);

module.exports = State;