import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    body: String,
    hidden: {
        type: Boolean,
        default: false
    },
    meta: {
        like: {
            type: Number,
            default: 0
        },
        view: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
    query: {
        byTitle(title) {
            return this.where({ title: new RegExp(title, 'i') });
        }
    }
});

export const Post = mongoose.model('Post', postSchema);