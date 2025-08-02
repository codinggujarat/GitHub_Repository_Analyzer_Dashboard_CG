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
      setError(' Invalid input — use owner/repo format');
      return;
    }

    setError('');
    onSubmit(`${owner}/${name}`);
  };

  return (
    <div className="form-card">
      <h1>GitHub Repository Analyzer</h1>
      <form onSubmit={handleSubmit} className="repo-form">
        <input
          value={repo}
          onChange={(e) => {
            setRepo(e.target.value);
            setError('');
          }}
          placeholder="Enter repo (e.g. vercel/next.js)"
        />
        <button type="submit">Analyze</button>

        {/* ✅ Styled Error Message */}
        {error && (
          <div className="error-message">
            <svg
              className="error-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-.01-10a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
            <span>{error}</span>
          </div>

        )}
      </form>
    </div>
  );
}
