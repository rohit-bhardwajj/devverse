import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import SnippetForm from './components/SnippetForm';
import SnippetList from './components/SnippetList';
import BlogForm from './components/blogform';
import BlogList from './components/BlogList';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/snippetsform" element={<SnippetForm />} />
                <Route path="/snippetslist" element={<SnippetList />} />
                <Route path="/createblog" element={<BlogForm />} />
                <Route path="/allblogs" element={<BlogList />} />
            </Routes>
        </Router>
    );
}

export default App;
