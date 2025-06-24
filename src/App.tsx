import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { RegistrationForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { LeadDetails } from './components/LeadDetails';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="text-xl font-bold text-gray-900">
                    Brighte Eats
                  </Link>
                </div>
                <div className="flex space-x-8 items-center">
                  <Link 
                    to="/" 
                    className="text-gray-900 hover:text-gray-600 transition-colors duration-150"
                  >
                    Register
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-900 hover:text-gray-600 transition-colors duration-150"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="py-10">
            <Routes>
              <Route path="/" element={<RegistrationForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lead/:id" element={<LeadDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;