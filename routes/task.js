const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();
const taskCtrl = require('../controllers/task')
const Task = require('../models/Task');


router.get('/', taskCtrl.getAllTasks)
router.post ('/', taskCtrl.createTask);
router.get ('/:id', taskCtrl.getOneTask);
router.put ('/:id', taskCtrl.modifyTask)
router.delete('/:id', taskCtrl.deleteTask);

// router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const task = new Task({
//       ...req.body
//     });
//     task.save()
//       .then(() => res.status(201).json({ message: 'Tache enregistrée !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.get('/', (req, res, next) => {
//     Task.find()
//       .then(users => res.status(200).json(users))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.get('/:id', (req, res, next) => {
//     Task.findOne({ _id: req.params.id })
//       .then(user => res.status(200).json(user))
//       .catch(error => res.status(404).json({ error }));
//   });

// router.put('/:id', (req, res, next) => {
//     Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Tache modifiée !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.delete('/:id', (req, res, next) => {
//     Task.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Tache supprimée !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

module.exports = router;