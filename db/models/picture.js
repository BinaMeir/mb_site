const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        trim: true,
        required: true
    },
    status: String,
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

pictureSchema.index({ category: 1 });

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
