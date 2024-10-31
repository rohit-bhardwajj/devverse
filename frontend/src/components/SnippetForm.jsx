// client/src/components/SnippetForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SnippetForm = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/snippets', { title, code, description });
        // Handle success (e.g., reset form, show success message)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Create Snippet</button>
        </form>
    );
};

export default SnippetForm;
