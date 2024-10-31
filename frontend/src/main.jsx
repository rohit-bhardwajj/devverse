// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home'; // Create this component
import Login from './components/Login'; // Your Login component
import RegisterForm from './components/RegisterForm';

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" component={Home} exact /> */}
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={Login} />
            </Routes>
        </Router>
    );
}

export default App;
