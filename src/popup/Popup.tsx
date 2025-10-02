import React from 'react';

const Popup: React.FC = () => {
  return (
    <div className="container">
      <h1>CorrectSpell</h1>
      <p>Your spelling assistant is running!</p>
      <div>
        <button onClick={() => chrome.tabs.create({ url: 'https://github.com' })}>
          Visit our website
        </button>
      </div>
    </div>
  );
};

export default Popup;