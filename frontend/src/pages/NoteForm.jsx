import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './NoteForm.css';

function ItemRow({ idx, item, onTextChange, onRemove }) {
  return (
    <div className="item-row">
      <input
        value={item.text}
        onChange={e => onTextChange(idx, e.target.value)}
        placeholder="Item text"
      />
      <button type="button" className="item-remove" onClick={() => onRemove(idx)}>X</button>
    </div>
  );
}

export default function NoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('checklist');
  const [items, setItems] = useState([{ text: '' }]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/notes/${id}`).then(res => {
        const n = res.data;
        setTitle(n.title || '');
        setType(n.type);
        setItems(n.items.length ? n.items.map(it => ({ text: it.text, done: !!it.done })) : [{ text: '' }]);
      }).catch(err => {
        console.error(err);
        alert('Failed to load note');
      }).finally(() => setLoading(false));
    }
  }, [id]);

  const addItem = () => setItems(prev => [...prev, { text: '' }]);
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItemText = (idx, text) => setItems(prev => prev.map((it, i) => i === idx ? { ...it, text } : it));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredItems = items.map(it => ({ text: (it.text || '').trim(), done: !!it.done })).filter(it => it.text.length > 0);
    if (filteredItems.length === 0) {
      return alert('Please add at least one item with text.');
    }
    if (!['bullet','checklist'].includes(type)) return alert('Invalid type');

    const payload = { title: title.trim(), type, items: filteredItems };

    try {
      setSaving(true);
      if (id) {
        await api.put(`/notes/${id}`, payload);
        alert('Note updated');
      } else {
        await api.post(`/notes`, payload);
        alert('Note created');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Note' : 'New Note'}</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title (optional)</label>
            <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          {/* <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="bullet">Bullet</option>
              <option value="checklist">Checklist (to-do)</option>
            </select>
          </div> */}

          <div className="items-section">
            <label className="form-label">Items</label>
            {items.map((it, idx) => (
              <ItemRow
                key={idx}
                idx={idx}
                item={it}
                onTextChange={updateItemText}
                onRemove={removeItem}
              />
            ))}
            <button type="button" className="btn btn-secondary" onClick={addItem}>Add item</button>
          </div>

          <div className="form-group">
            <button className="btn btn-primary me-2" type="submit" disabled={saving}>
              {saving ? 'Saving...' : id ? 'Update' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
