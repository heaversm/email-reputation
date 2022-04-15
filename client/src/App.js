import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting Name ${email}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
      <div className="flex justify-center">
        <div>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="form-label inline-block text-gray-700"
            >
              Enter Your Email Address
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white"
              id="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="inline-block mt-3 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
