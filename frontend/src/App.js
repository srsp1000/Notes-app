import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
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
         
        </Routes>
      </div>
    </div>
  );
}

export default App;
