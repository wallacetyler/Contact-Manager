const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema ({
    contact_name: {
        type: String,
        required: true
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
        required:true
    }
})

module.exports = mongoose.model('Contact', Contact);