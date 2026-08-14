const express = require('express');
const router = express.Router();
const { getPackages, getAllPackages, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect } = require('../middleware/auth');

router.get('/', getPackages);                        // public
router.get('/all', protect, getAllPackages);          // admin
router.post('/', protect, createPackage);             // admin
router.put('/:id', protect, updatePackage);           // admin
router.delete('/:id', protect, deletePackage);        // admin

module.exports = router;
