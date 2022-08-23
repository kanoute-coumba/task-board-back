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

module.exports = router;