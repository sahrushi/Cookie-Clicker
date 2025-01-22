import React, { useState } from 'react';
import ClickButton from './components/clickButton';
import './styles.css';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  const handleCreateUser  = () => {
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data._id);
        alert(`User  created: ${data.username}`);
      })
      .catch((err) => console.error(err));
  };

  if (!userId) {
    return (
      <div className="container">
        <div className="header">
          <h1>Create a User</h1>
        </div>
        <div className="create-user">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleCreateUser }>Create User</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ClickButton userId={userId} />
    </div>
  );
};

export default App;