const mongoose = require('mongoose')
//const validator = require('validator')
const id_validator = require ('mongoose-id-validator');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        required: true,
        trim: true
        // validate(value) {
        //     if (value < 0) {
        //         throw new Error('invalid celephone number')
        //     }
        // }
    },
    email:{
        type: String,
        required: false,
        trim: true
    }


});

// Create a model from the schema
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;