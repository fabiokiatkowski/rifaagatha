const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String },
    item: { type: String },
    deliveryMode: { type: String },
    store: { type: String },
    order: { type: Number },
    luckyNumber: { type: Number },
    confirmed: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', User);