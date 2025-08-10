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

// Get all 
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get one
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const { title, type, items } = req.body;
    if (type && !['bullet','checklist'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type.' });
    }
    if (items && (!Array.isArray(items) || items.length === 0)) {
      return res.status(400).json({ message: 'Items must be a non-empty array.' });
    }
    const note = await Note.findByIdAndUpdate(req.params.id, { title, type, items }, { new: true, runValidators: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
