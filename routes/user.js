const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', auth, userCtrl.getAllUsers)
router.post ('/', auth, userCtrl.createUser);
router.get ('/:id', auth, userCtrl.getOneUser);
router.put ('/:id', auth, userCtrl.modifyUser)
router.delete('/:id', auth, taskCtrl.deleteUser);

module.exports = router;