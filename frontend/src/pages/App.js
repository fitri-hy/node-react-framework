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
      <div class="container">
		<div class="card">
		  <img class="logo" src="/images/logo.png" alt="Logo" />
		  <h1 class="title">
			{message || 'Loading...'}
		  </h1>
		  <p class="description">
			Fullstack Framework with a backend using Node.js and a frontend using React.js 
			running on one server combines the power of these two technologies to build 
			modern and efficient web applications.
		  </p>
		  <div class="links">
			<a class="link" href="https://i-as.dev/" target="_blank">Official Site</a>
			<a class="link" href="https://github.com/fitri-hy/fullstack-framework" target="_blank">Github</a>
		  </div>
		</div>
	  </div>
    </main>
  );
};

export default App;