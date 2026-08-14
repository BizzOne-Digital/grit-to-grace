const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', submitContact);                        // public
router.get('/', protect, getContacts);                  // admin
router.put('/:id', protect, updateContact);             // admin
router.delete('/:id', protect, deleteContact);          // admin

module.exports = router;
