import React, { useState } from 'react';
import RepoForm from './components/RepoForm';
import Dashboard from './components/Dashboard';
import DarkVeil from './components/DarkVeil';

function App() {
  const [repo, setRepo] = useState(null);

  return (
    <>
      <div className='page-container'>
        <DarkVeil
        />
        <div className='card'>
          <RepoForm onSubmit={setRepo} />
          {repo && <Dashboard repo={repo} />}
        </div>
      </div>
    </>
  );
}

export default App;
