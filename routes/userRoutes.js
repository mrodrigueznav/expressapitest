const express = require('express');
const { handleUserSubmit, handleGetAllUsers } = require('../controllers/userController');
const { validateUser } = require('../validators/user.validator');

const router = express.Router();

router.get('/', handleGetAllUsers);
router.post('/', validateUser, handleUserSubmit);

module.exports = router;