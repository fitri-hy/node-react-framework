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
      <div className="flex flex-col w-full min-h-screen justify-center items-center bg-zinc-800">
        <div className="flex flex-col px-6 py-12 rounded-lg text-white max-w-3xl m-auto">
          <img className="h-36 w-36 m-auto" src="/images/logo.png" alt="Logo" />
          <h1 className="text-3xl text-center font-extrabold mt-6 text-yellow-500">
            {message || 'Loading...'}
          </h1>
          <p className="text-center m-auto max-w-lg text-gray-200 mt-4">
            Fullstack Framework with a backend using Node.js and a frontend using React.js 
            running on one server combines the power of these two technologies to build 
            modern and efficient web applications.
          </p>
          <div className="flex gap-6 w-full justify-center items-center mt-6">
            <a className="font-bold text-green-500 hover:text-green-600 underline" href="https://i-as.dev/" target="_blank">
              Official Site
            </a>
            <a className="font-bold text-green-500 hover:text-green-600 underline" href="https://github.com/fitri-hy/fullstack-framework" target="_blank">
              Github
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;