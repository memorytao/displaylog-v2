import { useState } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import WelcomeMessage from "./header/Welcome";
import ResponseTable from "./table/ResponseTable";

const API_BASE_URL = "http://localhost:8888";

const InputForm = ({ brand, log, value, setValue }) => {
  const submitSearch = (e) => {
    e.preventDefault();
    console.log("brand", brand, "log:", log, "searchParam", value);

    let body = {
      brand: brand,
      log: log,
      value: value,
    };

    console.log(body);

    fetch(`${API_BASE_URL}/api/v1/getlog`, {
      // fetch("https://meowfacts.herokuapp.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( body ),
      // body: JSON.stringify(body)
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  return (
    <form onSubmit={submitSearch}>
      <div className="flex flex-row items-center rounded-md p-2 gap-2 bg-[#262833] w-full h-15 relative">
        <div>
          <FaSearch className="text-gray-300 text-2xl ml-2" />
        </div>
        <input
          className="w-full outline-none text-2xl ml-2 text-gray-300 placeholder-gray-600 bg-transparent pr-8"
          type="text"
          name="search"
          id="search"
          placeholder="Multiple search by comma"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-3"
            tabIndex={-1}
            aria-label="Clear input"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

function App() {
  const [isResponseHistory, setIsResponseHistory] = useState(false);
  const [isContactHistory, setIsContactHistory] = useState(false);
  const [kafka, setKafka] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [isTRUE, setIsTRUE] = useState(false);
  const [isDTAC, setIsDTAC] = useState(false);

  return (
    <>
      <header>
        <div className="flex flex-row justify-center items-center p-4 text-white">
          <WelcomeMessage />
        </div>
      </header>
      <section>
        <div className="grid grid-cols-1 gap-4 m-10">
          <div className="flex flex-row gap-4 justify-center items-center">
            <button
              value={isTRUE}
              onClick={() => {
                setIsTRUE(true);
                setIsDTAC(false);
                console.log("TRUE");
              }}
              type="button"
              className={`'text-gray-900 hover:bg-slate-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-red-700 dark:focus:ring-red-700' 
                ${isTRUE ? "ring-4 ring-red-700 bg-red-400" : "bg-slate-300"}`}
            >
              TRUE
            </button>
            <button
              value={isDTAC}
              onClick={() => {
                setIsDTAC(true);
                setIsTRUE(false);
                console.log("DTAC");
              }}
              type="button"
              className={`'text-gray-900 hover:bg-slate-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-cyan-600 dark:focus:ring-cuyan-600' 
                ${
                  isDTAC ? "ring-4 ring-cyan-600 bg-blue-300" : " bg-slate-300"
                }`}
            >
              DTAC
            </button>
          </div>
          {isTRUE || isDTAC ? (
            <div className="flex flex-row gap-4 justify-center items-center">
              <button
                value={isResponseHistory}
                onClick={() => {
                  setIsResponseHistory(true);
                  setIsContactHistory(false);
                  setKafka(false);
                  console.log("Response History");
                }}
                type="button"
                className={`'text-gray-900 hover:bg-slate-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-emerald-500 dark:focus:ring-emerald-500' 
                ${
                  isResponseHistory
                    ? "ring-4 ring-emerald-500 bg-green-200"
                    : " bg-slate-300"
                }`}
              >
                Response History
              </button>

              <button
                onClick={() => {
                  setIsContactHistory(true);
                  setIsResponseHistory(false);
                  setKafka(false);
                  console.log("Contact History");
                }}
                type="button"
                className={`'text-gray-900  hover:bg-slate-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-orange-400 dark:focus:ring-orange-400' 
                ${
                  isContactHistory
                    ? "ring-4 ring-orange-400 bg-orange-300"
                    : "bg-slate-300"
                }`}
              >
                Contact History
              </button>

              <button
                disabled={true}
                onClick={() => {
                  setKafka(true);
                  setIsContactHistory(false);
                  setIsResponseHistory(false);
                  console.log("Kafka");
                }}
                type="button"
                className={`'text-gray-900 hover:bg-zinc-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-rose-400 dark:focus:ring-rose-400' 
                ${kafka ? "ring-4 ring-rose-400" : " bg-zinc-700"}`}
              >
                Kafka (Coming Soon)
              </button>
            </div>
          ) : null}

          {isResponseHistory || isContactHistory || kafka ? (
            <InputForm
              brand={isTRUE ? "TRUE" : isDTAC ? "DTAC" : ""}
              log={
                isResponseHistory
                  ? "response"
                  : isContactHistory
                  ? "contact"
                  : kafka
                  ? "kafka"
                  : ""
              }
              value={searchParam}
              setValue={setSearchParam}
            />
          ) : null}
        </div>
      </section>

      <section>
        <div className="justify-center items-center text-left text-white">
          <ResponseTable />
        </div>
      </section>
    </>
  );
}

export default App;
