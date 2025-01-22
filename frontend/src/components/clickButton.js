import React, { useState, useEffect } from 'react';
import '../styles.css';

const ClickButton = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  const handleClick = () => {
    fetch('http://localhost:5000/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setUser(data.user);
        if (data.message.includes('You won a prize!')) {
          alert('Congratulations, you won a prize!');
        }
      });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <div className="header">
        <h1>Score: {user.totalScore}</h1>
        <h2>Prizes Won: {user.prizesWon}</h2>
      </div>
      <button className="button" onClick={handleClick}>
        Click Me!
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ClickButton;