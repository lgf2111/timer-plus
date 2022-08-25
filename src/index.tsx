import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <div className="warn">
      <small>Some browsers are incompatible with TTS, you may check <span></span>
        <a href='https://caniuse.com/?search=speechSynthesis'>here</a>.
      </small>
    </div>
  </React.StrictMode>
);
