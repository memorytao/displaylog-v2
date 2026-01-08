import { useState } from "react";
import "./App.css";
import WelcomeMessage from "./pages/Welcome";
import ResponseTable from "./pages/ResponseTable";
import InputForm from "./components/InputForm";
// import Pagination from "./components/Pagination"; // เหมือนท่านเต๋า comment ไว้ ผมเลย comment ตาม
import ContactTable from "./pages/ContactTable";
import ExportFile from "./components/ExportFile";

function App() {
  const [isResponseHistory, setIsResponseHistory] = useState(true);
  const [isContactHistory, setIsContactHistory] = useState(false);
  const [kafka, setKafka] = useState(false);
  const [isTOL, setIsTOL] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [isTRUE, setIsTRUE] = useState(false);
  const [isDTAC, setIsDTAC] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // const [start, setStart] = useState(1);
  // const [end, setEnd] = useState(40);

  return (
    <>
      <header>
        <div className="flex flex-row justify-center items-center p-4 text-white">
          <WelcomeMessage />
        </div>
      </header>
      <section>
        <div className="grid grid-cols-1 gap-4 m-10">
          <div className="flex flex-row gap-4 justify-start items-center">
            {/* <div className="text-white size-1/12"> Brands: </div> */}
            <button
              value={isTRUE}
              onClick={() => {
                setIsTRUE(true);
                setIsDTAC(false);
                setApiResponse(null);
                setIsTOL(false);
                setSearchParam("");
                console.log("TRUE");
              }}
              type="button"
              className={`' transition delay-100 duration-200 ease-in-out font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-red-200 hover:bg-red-400 focus:ring-3 focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-red-400 dark:focus:ring-red-700' 
                ${isTRUE ? "ring-4 ring-red-400 bg-red-500" : "bg-zinc-600 text-gray-400"}`}
            >
              TRUE
            </button>
            <button
              value={isDTAC}
              onClick={() => {
                setIsDTAC(true);
                setIsTRUE(false);
                setApiResponse(null);
                setIsTOL(false);
                setSearchParam("");
                console.log("DTAC");
              }}
              type="button"
              className={`' transition delay-100 duration-200 ease-in-out font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-blue-200 hover:bg-blue-400 focus:ring-3 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-blue-400 dark:focus:ring-blue-700' 
                ${isDTAC ? "ring-4 ring-blue-400 bg-blue-500" : "bg-zinc-600 text-gray-400"
                }`}
            >
              DTAC
            </button>

            <button
              value={isTOL}
              disabled={true}
              onClick={() => {
                setIsDTAC(false);
                setIsTRUE(false);
                setApiResponse(null);
                setSearchParam("");
                console.log("TOL");
              }}
              type="button"
              className={`' transition delay-100 duration-200 ease-in-out font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-blue-200 hover:bg-blue-400 focus:ring-3 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-blue-400 dark:focus:ring-blue-700' 
                ${isTOL ? "ring-4 ring-blue-500 bg-blue-500" : "bg-zinc-600 text-gray-400"
                }`}
            >
              TOL
            </button>
          </div>
          {isTRUE || isDTAC ? (


            <div className="flex flex-row gap-4 justify-start items-center">

              {/* Response History button */}
              <button
                value={isResponseHistory}
                onClick={() => {
                  setIsResponseHistory(true);
                  setIsContactHistory(false);
                  setKafka(false);
                  setApiResponse(null);
                  console.log("Response History");
                }}
                type="button"
                className={`' transition delay-100 duration-200 ease-in-out cursor-pointer text-gray-700 hover:bg-green-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-emerald-500 dark:focus:ring-emerald-500' 
                ${isResponseHistory
                    ? "ring-4 ring-emerald-500 bg-green-400"
                    : " bg-zinc-600 text-gray-400"
                  }`}
              >
                Response History
              </button>

              {/* Contact History button */}
              <button
                onClick={() => {
                  setIsContactHistory(true);
                  setIsResponseHistory(false);
                  setKafka(false);
                  setApiResponse(null);
                  console.log("Contact History");
                }}
                type="button"
                className={`' transition delay-100 duration-200 ease-in-out cursor-pointer text-gray-700  hover:bg-orange-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-orange-400 dark:focus:ring-orange-400' 
                ${isContactHistory
                    ? "ring-4 ring-orange-400 bg-orange-300"
                    : "bg-zinc-600 text-gray-400"
                  }`}
              >
                Contact History
              </button>

              {/* Kafka button */}
              <button
                disabled={true}
                onClick={() => {
                  setKafka(true);
                  setIsContactHistory(false);
                  setIsResponseHistory(false);
                  setIsTOL(false);
                  setApiResponse(null);
                  console.log("Kafka");
                }}
                type="button"
                className={`'text-gray-100 hover:bg-zinc-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-rose-400 dark:focus:ring-rose-400' 
                ${kafka ? "ring-4 ring-rose-400" : " bg-zinc-700"}`}
              >
                Kafka
              </button>

              {/* Export button */}
              <ExportFile data={apiResponse} />

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
              onApiResponse={setApiResponse}
              setLoading={setIsLoading}
            // start={start ? start : 1}
            // end={end ? end : 40}
            />
          ) : null}
        </div>
      </section>

      <section>
        <div>
          <div className="m-10 justify-center items-center text-left text-white">

            {(apiResponse || isLoading) && isResponseHistory && (
              <ResponseTable data={apiResponse} isLoading={isLoading} />
            )}

            {(apiResponse || isLoading) && isContactHistory && (
              <ContactTable data={apiResponse} isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;