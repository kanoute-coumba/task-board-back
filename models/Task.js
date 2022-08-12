const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    accountType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: [
            'Urgent',
            'Simple',
        ],
        defaultValue: 'Simple',
        required: true
    },
    statut: {
        type: String,
        enum: [
            'Complete',
            'Pending',
            'Cancelled'
        ],
        defaultValue: 'Simple',
        required: true
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoose.model('Task', taskSchema)