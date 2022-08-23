const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    deadline: {
        type: Date,
        // required: true
    },
    priority: {
        type: String,
        enum: [
            'URGENT',
            'SIMPLE',
        ],
        defaultValue: 'SIMPLE',
        // required: true
    },
    statut: {
        type: String,
        enum: [
            'Complete',
            'Pending',
            'Cancelled'
        ],
        defaultValue: 'Pending',
        // required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // defaultValue: '01',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // defaultValue: '01',
        // required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)