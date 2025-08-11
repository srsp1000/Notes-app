import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import NoteForm from './pages/NoteForm';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar container">
        <Link className="brand" to="/">Notes App</Link>
        <Link className="btn" to="/new">+ New Note</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NoteForm />} />
          <Route path="/edit/:id" element={<NoteForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
