const Task = require('../models/Task')
const fs = require('fs');

exports.createTask = (req, res, next) => {
  //  recupérer lid de la personne connecté
  
    delete req.body._id;
    const task = new Task({
      ...req.body,
      
    });
    task.save()
      .then(() => res.status(201).json({ message: 'Tache enregistrée !'}))
      .catch((error) => {

        res.status(400).json({ message: error})
        console.log(error);
      })
  }

exports.modifyTask = (req, res, next) => {
    Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      // .populate('assignedTo')
      // .populate('createdBy')
      .then(() => res.status(200).json({ message: 'Tache modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.deleteTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Tache supprimée !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.getOneTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
      .populate('assignedTo')
      .populate('createdBy')
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllTasks = (req, res, next) => {
    Task.find()
      .populate('assignedTo')
      .populate('createdBy')
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
  }