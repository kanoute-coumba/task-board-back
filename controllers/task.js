const Task = require('../models/Task')
const fs = require('fs');

///////////////////// avec multer ///////////////
exports.createTask = (req, res, next) => {
    delete req.body._id;
    const task = new Task({
      ...req.body
    });
    task.save()
      .then(() => res.status(201).json({ message: 'Tache enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  }
////////////////////// avec multer ////////////////
exports.modifyTask = (req, res, next) => {
    Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Tache modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }

/////////////// avec multer et supprimer l'image qui va avec depuis notre serveur ///////////////////////////
exports.deleteTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Tache supprimée !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.getOneTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllTasks = (req, res, next) => {
    Task.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
  }