import { useState } from "react";
import "./App.css";
import WelcomeMessage from "./pages/Welcome";
import ResponseTable from "./pages/ResponseTable";
import InputForm from "./components/InputForm";
import Pagination from "./components/Pagination";
import ContactTable from "./pages/ContactTable";
import ExportFile from "./components/ExportFile";

function App() {
  const [isResponseHistory, setIsResponseHistory] = useState(true);
  const [isContactHistory, setIsContactHistory] = useState(false);
  const [kafka, setKafka] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [isTRUE, setIsTRUE] = useState(false);
  const [isDTAC, setIsDTAC] = useState(true);

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
                console.log("TRUE");
              }}
              type="button"
              className={`' font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-red-500 hover:bg-red-400 focus:ring-3 focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-red-700 dark:focus:ring-red-700' 
                ${isTRUE ? "ring-4 ring-red-400 bg-red-400" : "bg-red-200"}`}
            >
              TRUE
            </button>
            <button
              value={isDTAC}
              onClick={() => {
                setIsDTAC(true);
                setIsTRUE(false);
                setApiResponse(null);
                console.log("DTAC");
              }}
              type="button"
              className={`' font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-blue-500 hover:bg-blue-400 focus:ring-3 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-blue-700 dark:focus:ring-blue-700' 
                ${isDTAC ? "ring-4 ring-blue-400 bg-blue-400" : " bg-blue-200"
                }`}
            >
              DTAC
            </button>
          </div>
          {isTRUE || isDTAC ? (
            <div className="flex flex-row gap-4 justify-start items-center">
              {/* <div className="text-white size-1/12">Logs:</div> */}
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
                className={`' cursor-pointer text-gray-700 hover:bg-green-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-emerald-500 dark:focus:ring-emerald-500' 
                ${isResponseHistory
                    ? "ring-4 ring-emerald-500 bg-green-400"
                    : " bg-emerald-300"
                  }`}
              >
                Response History
              </button>

              <button
                onClick={() => {
                  setIsContactHistory(true);
                  setIsResponseHistory(false);
                  setKafka(false);
                  setApiResponse(null);
                  console.log("Contact History");
                }}
                type="button"
                className={`' cursor-pointer text-gray-700  hover:bg-orange-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-orange-400 dark:focus:ring-orange-400' 
                ${isContactHistory
                    ? "ring-4 ring-orange-400 bg-orange-300"
                    : "bg-orange-300"
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
                  setApiResponse(null);
                  console.log("Kafka");
                }}
                type="button"
                className={`'text-gray-100 hover:bg-zinc-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-rose-400 dark:focus:ring-rose-400' 
                ${kafka ? "ring-4 ring-rose-400" : " bg-zinc-700"}`}
              >
                Kafka
              </button>
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
            />
          ) : null}
        </div>
      </section>

      <section>
        <div>
          {/* <hr className="border-t-2 border-slate-700 mx-10" /> */}
          <div className="m-10 justify-center items-center text-left text-white">
            {apiResponse && isResponseHistory && <ResponseTable data={apiResponse} />}
            {apiResponse && isContactHistory && <ContactTable data={apiResponse} />}
          </div>
          {
            <Pagination onApiResponse={setApiResponse}
              // currentPage={currentPage}
              // totalPages={totalPages}
              // onPageChange={handlePageChange}
            />}

        </div>
      </section>
    </>
  );
}

export default App;
