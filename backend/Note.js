const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: '' },
    type: { type: String, enum: ['bullet', 'checklist'], required: true },
    items: {
      type: [
        {
          _id: false, 
          text: { type: String, required: true, trim: true },
          done: { type: Boolean, default: false }
        }
      ],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: 'A note must have at least one item.'
      }
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('Note', noteSchema);
