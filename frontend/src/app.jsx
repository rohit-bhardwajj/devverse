import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home'; // Uncomment if you have a Home component
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
