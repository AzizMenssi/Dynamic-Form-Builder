import React from 'react';
import Home from './pages/Home/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder/FormBuilder';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="" Component={Home} />
        <Route path="/formBuilder/:formId" Component={FormBuilder} />
        <Route path="/formBuilder" Component={FormBuilder} />
      </Routes>
    </Router>
  );
}
export default App;
