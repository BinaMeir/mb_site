const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    description: String,
    uploadDate: {
        type: Date,
        default: Date.now
    },
    imageType: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
