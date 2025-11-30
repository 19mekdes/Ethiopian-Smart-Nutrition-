import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ChildrenList from './pages/ChildrenList.jsx';


function App() {
  return (
    // Note: The <BrowserRouter> wrapper is intentionally omitted here. 
    // It must only exist once in your application, usually in src/main.jsx, 
    // to prevent routing conflicts and errors.
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/children" element={<ChildrenList />} />
      {/* Fallback route for 404 pages */}
      
    </Routes>
  );
}

export default App;