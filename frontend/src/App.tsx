import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar'; 
import Dashboard from './pages/Dashboard';       
import Events from './pages/Events';           
import Sales from './pages/Sales';             
import Reports from './pages/Reports';         
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;