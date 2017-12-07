var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imagesSchema = new Schema({
    keyword: {
        type: String
    },
    images: [String]
}, {
    timestamps: true
});

var searchImage = mongoose.model('searchImage', imagesSchema);
module.exports = searchImage;
