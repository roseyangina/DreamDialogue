const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"],
        },

        content: {
            type: String,
            required: [true, "Please enter post"],
        },
    },
    
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;