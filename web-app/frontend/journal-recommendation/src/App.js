import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path = '/' Component={Home} />
        <Route path='/dashboard' Component={Dashboard}/>
      </Routes>
    </div>
  )
}

export default App;
