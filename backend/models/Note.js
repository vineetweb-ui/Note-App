const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    body: {
        type: String,
        required: [true, 'Please add note text']
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
