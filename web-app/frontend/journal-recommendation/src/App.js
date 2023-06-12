import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


function App() {
  const userId = localStorage.getItem('userId')
  return (
    <div className="App">
      <Routes>
        <Route path = '/' Component={Home} />
        <Route path='/dashboard' element={<Dashboard userId={userId} />}/>
      </Routes>
    </div>
  );
}

export default App;
