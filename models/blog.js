var mongoose = require('mongoose');

var Blogchema = new mongoose.Schema({
    title: String,
    description: String,
    published_date: { type: Date, default: Date.now },
    modify_date: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    start_date: Date,
    end_date: Date,
    recurrenceOption: String,
    recurrence: {
        repeatEvery: {
            option1: { type: String, Default: '' },
            option2: { type: String, Default: '' },
        },
        repeatOn: {
            option1: { type: String, Default: '' },
            option2: { type: String, Default: '' },
            option3: { type: String, Default: '' },
        }
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    collection: 'blog'
});

const Blog = mongoose.model('blog', Blogchema)
module.exports.Blog = Blog
