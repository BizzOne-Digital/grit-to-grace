const express = require('express');
const router = express.Router();
const { getServices, getAllServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

router.get('/', getServices);                       // public
router.get('/all', protect, getAllServices);         // admin
router.post('/', protect, createService);            // admin
router.put('/:id', protect, updateService);          // admin
router.delete('/:id', protect, deleteService);       // admin

module.exports = router;
