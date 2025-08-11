import React from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css';

export default function NoteCard({ note, onDelete, onToggle }) {
  return (
    <div className="note-card">
      <div className="note-card-header">
        <span className="note-title">{note.title || '(No title)'}</span>
        <div className="note-actions">
          <Link className="btn-small btn-edit" to={`/edit/${note._id}`}>Edit</Link>
          <button className="btn-small btn-delete" onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      </div>
      <small>Type: {note.type}</small>
      <ul className="note-items">
        {note.items.map((it, idx) => (
          <li key={idx} className="note-item">
            {note.type === 'checklist' ? (
              <>
                <input type="checkbox" className="checkbox"
                  checked={!!it.done}
                  onChange={() => onToggle(note._id, idx, !it.done)} />
                <span style={{ textDecoration: it.done ? 'line-through' : 'none' }}>{it.text}</span>
              </>
            ) : (
              <span>{it.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
