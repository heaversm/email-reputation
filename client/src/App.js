import React, { useState } from "react";
import "./App.css";
import { tempData } from "./tempData";

function App() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [rep, setRep] = useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Submitting Name ${email}`);
    fetch(`/getrep/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setData(data.error);
          console.log(data.details);
        } else {
          console.log(data);
          setRep(data);
          setData("displaying reputation result");
        }

        //MH: TEMP
        //setRep(tempData);
      });
  };

  const RenderRepData = () => {
    const { reputation, suspicious, details } = rep;
    const {
      blacklisted,
      domain_reputation,
      domain_exists,
      data_breach,
      malicious_activity,
      spam,
    } = details;
    // console.log(
    //   reputation,
    //   suspicious,
    //   blacklisted,
    //   domain_reputation,
    //   domain_exists
    // );
    return (
      <div className="App-results flex justify-center mt-10">
        <div className="w-6/12 max-w-md flex flex-col">
          <h6 className="font-medium leading-tight text-base my-4 text-blue-600">
            E-Mail Reputation Results
          </h6>
          <div>
            <ul>
              <li>
                <span className="font-medium">Reputation: </span>
                <span
                  className={`
                    font-bold
                    ${
                      reputation === "low"
                        ? "text-red-700"
                        : reputation === "medium"
                        ? "text-yellow-400"
                        : "text-green-700"
                    }
                  `}
                >
                  {reputation}
                </span>
              </li>
              <li>
                <span className="font-medium">Suspicious: </span>
                <span
                  className={`
                    font-bold
                    ${suspicious ? "text-red-700" : "text-green-700"}
                  `}
                >
                  {suspicious ? "true" : "false"}
                </span>
              </li>
              <li>
                <span className="font-medium">Blacklisted: </span>
                <span
                  className={`
                    font-bold
                    ${blacklisted ? "text-red-700" : "text-green-700"}
                  `}
                >
                  {blacklisted ? "true" : "false"}
                </span>
              </li>
              <li>
                <span className="font-medium">Data Breach: </span>
                <span
                  className={`
                    font-bold
                    ${data_breach ? "text-red-700" : "text-green-700"}
                  `}
                >
                  {data_breach ? "true" : "false"}
                </span>
              </li>
              <li>
                <span className="font-medium">Malicious Activity: </span>
                <span
                  className={`
                    font-bold
                    ${malicious_activity ? "text-red-700" : "text-green-700"}
                  `}
                >
                  {malicious_activity ? "true" : "false"}
                </span>
              </li>
              <li>
                <span className="font-medium">Spam: </span>
                <span
                  className={`
                    font-bold
                    ${spam ? "text-red-700" : "text-green-700"}
                  `}
                >
                  {spam ? "true" : "false"}
                </span>
              </li>
              {domain_exists && (
                <li>
                  <span className="font-medium">Domain Reputation: </span>
                  <span
                    className={`
                    font-bold
                    ${
                      domain_reputation === "low"
                        ? "text-red-700"
                        : domain_reputation === "medium"
                        ? "text-yellow-400"
                        : "text-green-700"
                    }
                  `}
                  >
                    {domain_reputation}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const RenderRep = () => {
    if (rep) {
      return <RenderRepData />;
    }
    return <div></div>;
  };

  return (
    <div className="App">
      <header className="App-header flex justify-center">
        <div className="w-6/12 max-w-md my-4">
          <p>{!data ? "Loading..." : data}</p>
        </div>
      </header>
      <div className="App-form flex justify-center">
        <div className="w-6/12 max-w-md">
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
      <RenderRep />
    </div>
  );
}

export default App;
