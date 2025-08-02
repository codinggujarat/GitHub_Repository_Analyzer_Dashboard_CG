import React, { useState } from 'react';
import RepoForm from './components/RepoForm';
import Dashboard from './components/Dashboard';

function App() {
  const [repo, setRepo] = useState(null);

  return (
    <>
      <div className='page-container'>
        <h1>📈 GitHub Repository Analyzer</h1>
        <RepoForm onSubmit={setRepo} />
        {repo && <Dashboard repo={repo} />}
      </div>
    </>
  );
}

export default App;
