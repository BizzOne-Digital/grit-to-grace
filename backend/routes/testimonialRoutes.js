const express = require('express');
const router = express.Router();
const { getTestimonials, getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.get('/', getTestimonials);                            // public
router.get('/all', protect, getAllTestimonials);             // admin
router.post('/', protect, createTestimonial);               // admin
router.put('/:id', protect, updateTestimonial);             // admin
router.delete('/:id', protect, deleteTestimonial);          // admin

module.exports = router;
