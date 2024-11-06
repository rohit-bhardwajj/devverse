import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import RegisterForm from './components/Authentication/RegisterForm';
import SnippetForm from './components/Snippets/SnippetForm';
import SnippetList from './components/Snippets/SnippetList';
import BlogForm from './components/AllBlogs/BlogForm';
import BlogList from './components/AllBlogs/BlogList';
import Home from './pages/Home/Home';
import AdminPanel from './components/admin/AdminPanel'; // Import the Admin Panel
// import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/snippetsform" element={<SnippetForm />} />
                <Route path="/snippetslist" element={<SnippetList />} />
                <Route path="/createblog" element={<BlogForm />} />
                <Route path="/allblogs" element={<BlogList />} />
                <Route path="/admin" element={<AdminPanel />} />
                

            </Routes>
        </Router>
    );
}

export default App;
