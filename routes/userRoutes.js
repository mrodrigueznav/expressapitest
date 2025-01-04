const express = require('express');
const { handleUserSubmit, handleGetAllUsers, handleFileUpload, upload } = require('../controllers/userController');
const { validateUser } = require('../validators/user.validator');

const router = express.Router();

router.get('/', handleGetAllUsers);
router.post('/', validateUser, handleUserSubmit);
router.post('/upload', upload.array('files', 10), handleFileUpload);

module.exports = router;