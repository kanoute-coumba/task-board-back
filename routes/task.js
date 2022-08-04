const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();
const taskCtrl = require('../controllers/task')


router.get('/', auth, taskCtrl.getAllTasks)
router.post ('/', auth, multer, stfCtrl.createTask);
router.get ('/:id', auth, taskCtrl.getOneTask);
router.put ('/:id', auth, multer, taskCtrl.modifyTask)
router.delete('/:id', auth, taskCtrl.deleteTask);

module.exports = router;