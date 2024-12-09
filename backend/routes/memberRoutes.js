// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/members', memberController.getAllMembers);
router.get('/members/:id', memberController.getMemberById);
router.post('/members', memberController.createMember);
router.put('/members/:id', memberController.updateMember);
router.delete('/members/:id', memberController.deleteMember);

module.exports = router;