// src/components/RepoForm.jsx

import { useState } from 'react';

export default function RepoForm({ onSubmit }) {
  const [repo, setRepo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = repo.trim();
    const [owner, name] = input.split('/');

    if (!owner || !name) {
      setError('⚠️ Format must be owner/repo (e.g. vercel/next.js)');
      return;
    }

    setError('');
    onSubmit(`${owner}/${name}`);
  };

  return (
    <>
      <div className="form-card">

        <h1>GitHub Repository Analyzer</h1>
        <form onSubmit={handleSubmit} className="repo-form ">
          <input
            value={repo}
            onChange={(e) => {
              setRepo(e.target.value);
              setError('');
            }}
            placeholder="Enter repo (e.g. vercel/next.js)"
          />
          <button type="submit">Analyze</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div >
    </>
  );
}
