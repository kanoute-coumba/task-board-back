const mongoose =require('mongoose');
const taskSchema = mongoose.Schema({

    // const AccountType = {
    //     ADMIN : 'ADMIN',
    //     EMPLOYEE : 'EMPLOYEE'
    // };
    // const Priority = {
    //     URGENT : 'URGENT',
    //     SIMPLE : 'SIMPLE'
    // };

    // const Status = {
    //     COMPLETE: 'COMPLETE',
    //     PENDING : 'PENDING',
    //     CANCELLED : 'CANCELLED'
    // }

    accountType : {
        type: DataTypes.ENUM,
        values: [
            'Admin',
            'Employee',
        ],
        defaultValue: 'Employee',
        required: true
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    deadline : {
        type: dateTime,
        required: true
    },
    priority : {
        type: DataTypes.ENUM,
        values: [
            'Urgent',
            'Simple',
        ],
        defaultValue: 'Simple',
        required: true
    },
    statut : {
        type: DataTypes.ENUM,
        values: [
            'Complete',
            'Pending',
            'Cancelled'
        ],
        defaultValue: 'Simple',
        required: true
    },
    assignTo : {
        type: String,
        require : true
    },
    createdBy : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('Task', taskSchema)