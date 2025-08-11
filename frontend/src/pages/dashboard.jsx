import React, { useEffect, useState } from 'react';
import api from '../api';
import NoteCard from '../components/NoteCard';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';



export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleToggle = async (noteId, itemIndex, newDone) => {
    try {
      const note = notes.find(n => n._id === noteId);
      if (!note) return;
      if (note.type !== 'checklist') return;
      const updatedItems = note.items.map((it, idx) => idx === itemIndex ? { ...it, done: newDone } : it);
      const res = await api.put(`/notes/${noteId}`, { ...note, items: updatedItems });
      setNotes(prev => prev.map(n => n._id === noteId ? res.data : n));
    } catch (err) {
      console.error(err);
      alert('Toggle failed');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>All Notes</h2>
        <button className="primary-btn" onClick={() => navigate('/new')}>Create Note</button>
      </div>

      {loading ? <div>Loading...</div> : (
        notes.length === 0 ? <div className="empty-text">No notes yet — create one.</div> :
          <div className="notes-list">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} onDelete={handleDelete} onToggle={handleToggle} />
            ))}
          </div>
      )}
    </div>
  );
}
