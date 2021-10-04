//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Usuario', UsuarioSchema);