const Contact = require('../models/Contact');

// POST submit contact form (public)
const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Message received. We will contact you soon.', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET all leads (admin)
const getContacts = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    const counts = {
      total: await Contact.countDocuments(),
      new: await Contact.countDocuments({ status: 'new' }),
      contacted: await Contact.countDocuments({ status: 'contacted' }),
      closed: await Contact.countDocuments({ status: 'closed' })
    };
    res.json({ success: true, data: contacts, counts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update status/notes
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, getContacts, updateContact, deleteContact };
