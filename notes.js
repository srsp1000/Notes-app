const express = require('express');
const router = express.Router();
const Note = require('./Note');

// Create note
router.post('/', async (req, res) => {
  try {
    const { title, type, items } = req.body;
    if (!type || !['bullet','checklist'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type. Must be "bullet" or "checklist".' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items required (non-empty array).' });
    }
    const note = new Note({ title: title || '', type, items });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
