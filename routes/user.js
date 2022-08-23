const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();
const userCtrl = require('../controllers/user')
const Task = require('../models/Task');

router.post('/signup', userCtrl.signup)
router.post ('/login', userCtrl.login);

router.get('/', userCtrl.getAllUsers)
router.post ('/', userCtrl.createUser);
router.get ('/:id', userCtrl.getOneUser);
router.put ('/:id', userCtrl.modifyUser)
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;