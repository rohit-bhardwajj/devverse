import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SnippetList() {
    const [snippets, setSnippets] = useState([]); // State to store snippets
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        // Fetch snippets from the backend
        const fetchSnippets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/snippets');
                setSnippets(response.data); // Store fetched snippets in state
            } catch (error) {
                console.error('Error fetching snippets:', error);
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchSnippets();
    }, []);

    if (loading) return <p>Loading snippets...</p>;

    return (
        <div>
            <h2>Snippets List</h2>
            {snippets.length === 0 ? (
                <p>No snippets available.</p>
            ) : (
                <ul>
                    {snippets.map((snippet) => (
                        <li key={snippet._id}>
                            <h3>{snippet.title}</h3>
                            <p>{snippet.description}</p>
                            <pre>{snippet.code}</pre>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SnippetList;
