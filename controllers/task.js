const Task = require('../models/Task')
const fs = require('fs');

/////////////////// Sans multer ////////////////////////
// exports.createThing = (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//         ...req.body
//     });
//     thing.save()
//     .then(() => res.status(201).json({ message : 'Objet enregistre!'}))
//     .catch(error => res.status(400).json({error}))
// }

///////////////////// avec multer ///////////////
exports.createTask = (req, res, next) => {
    const taskObject = JSON.parse(req.body.task);
    delete taskObject._id;
    delete taskObject._userId;
    const task = new Task({
        ...taskObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    task.save()
        .then(() => {
            res.status(201).json({
                message: 'Tache enregistrée !'
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
};

////////////////// sans multer //////////////////////
// exports.modifyThing = (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
//     .then(() => res.status(200).json({message : 'Objet modifié'}))
//     .catch(error => res.status(400).json({error}))
// }

////////////////////// avec multer ////////////////
exports.modifyTask = (req, res, next) => {
    const taskObject = req.file ? {
        ...JSON.parse(req.body.task),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };

    delete taskObject._userId;
    Task.findOne({
            _id: req.params.id
        })
        .then((task) => {
            if (task.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                });
            } else {
                Task.updateOne({
                        _id: req.params.id
                    }, {
                        ...taskObject,
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'tache modifiée!'
                    }))
                    .catch(error => res.status(401).json({
                        error
                    }));
            }
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

////////////// sans multer /////////////////////////
// exports.deleteThing = (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id})
//     .then(() => res.status(200).json({message: 'Objet supprimé'}))
//     .catch(error => res.status(400).json({error}))
// }

/////////////// avec multer et supprimer l'image qui va avec depuis notre serveur ///////////////////////////
exports.deleteTask = (req, res, next) => {
    Task.findOne({
            _id: req.params.id
        })
        .then(task => {
            if (task.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                });
            } else {
                const filename = task.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Task.deleteOne({
                            _id: req.params.id
                        })
                        .then(() => {
                            res.status(200).json({
                                message: 'Objet supprimé !'
                            })
                        })
                        .catch(error => res.status(401).json({
                            error
                        }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
};

exports.getOneTask = (req, res, next) => {
    Task.findOne({
            _id: req.params.id
        })
        .then(task => res.status(200).json(task))
        .catch(error => res.status(400).json({
            error
        }))
}

exports.getAllTasks = (req, res, next) => {
    Task.find()
        .then(task => res.status(200).json(task))
        .catch(error => res.status(400).json({
            error
        }))
}