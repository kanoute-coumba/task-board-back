const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userCtrl = require('../controllers/user')
const User = require('../models/User');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', userCtrl.getAllUsers)
router.post ('/', userCtrl.createUser);
router.get ('/:id', userCtrl.getOneUser);
router.put ('/:id', userCtrl.modifyUser)
router.delete('/:id', userCtrl.deleteUser);

// router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const user = new User({
//       ...req.body
//     });
//     user.save()
//       .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.get('/', (req, res, next) => {
//     User.find()
//       .then(users => res.status(200).json(users))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.get('/:id', (req, res, next) => {
//     User.findOne({ _id: req.params.id })
//       .then(user => res.status(200).json(user))
//       .catch(error => res.status(404).json({ error }));
//   });

// router.put('/:id', (req, res, next) => {
//     User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'utilisateur modifié !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.delete('/:id', (req, res, next) => {
//     User.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Utlisateur supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

module.exports = router;