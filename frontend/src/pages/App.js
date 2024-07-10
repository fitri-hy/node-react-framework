import React, { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <main className="app">
      <div className="container">
		<div className="card">
		  <img className="logo" src="/images/logo.png" alt="Logo" />
		  <h1 className="title">
			{message || 'Loading...'}
		  </h1>
		  <p className="description">
			Fullstack Framework with a backend using Node.js and a frontend using React.js 
			running on one server combines the power of these two technologies to build 
			modern and efficient web applications.
		  </p>
		  <div className="links">
			<a className="link" href="https://i-as.dev/" target="_blank">Official Site</a>
			<a className="link" href="https://github.com/fitri-hy/node-react-framework" target="_blank">Github</a>
		  </div>
		</div>
	  </div>
    </main>
  );
};

export default App;