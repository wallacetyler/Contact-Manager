const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema ({
    contact_name: {
        type: String,
        required: true
    },
    contact_nickname: {
        type: String
    },
    contact_birthday: {
        type: Date
    },
    contact_email: {
        type: String,
        required: true
    },
    contact_address: {
        type: String,
        required: true
    },
    contact_phone: {
        type: String,
    },
    contact_notes: {
        type: String
    }
})

module.exports = mongoose.model('Contact', Contact);