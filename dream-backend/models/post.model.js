const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"],
        },

        title: {
            type: String,
            required: [true, "Please enter the dream title"],
        },
        
        content: {
            type: String,
            required: [true, "Please enter the dream content"],
        },
        reactions: {
            type: Map,
            of: Number, // e.g., { "👍": 5, "😂": 3, "❤️": 2 }
            default: {},
        },
    },
    
    {
        timestamps: true,
    }
);

// Check if the model already exists before defining it
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
//const Post = mongoose.model('Post', PostSchema);
module.exports = Post;