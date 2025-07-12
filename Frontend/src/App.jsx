
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ExplorePage from './pages/ExplorePage';
import SwapFormPage from './pages/SwapFormPage';
import RequestsPage from './pages/RequestsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/swap-form" element={<SwapFormPage />} />
          <Route path="/requests" element={<RequestsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;