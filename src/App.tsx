import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import JournalEntry from './pages/JournalEntry';
import PastEntries from './pages/PastEntries';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ConnectionStatus from './components/layout/ConnectionStatus';

function App() {
  const { isAuthenticated, initialize } = useAuthStore();
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/journal/:id?" element={isAuthenticated ? <JournalEntry /> : <Navigate to="/login" />} />
          <Route path="/entries" element={isAuthenticated ? <PastEntries /> : <Navigate to="/login" />} />
          <Route path="/insights" element={isAuthenticated ? <Insights /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ConnectionStatus />
    </Router>
  );
}

export default App;