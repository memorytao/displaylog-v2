import { useState } from "react";
import "./App.css";
import WelcomeMessage from "./pages/Welcome";
import ResponseTable from "./pages/ResponseTable";
import InputForm from "./components/InputForm";
import ContactTable from "./pages/ContactTable";
import ExportFile from "./components/ExportFile";

function App() {

  const [selectedBrand, setSelectedBrand] = useState("DTAC"); // "TRUE", "DTAC", "TOL"
  const [logType, setLogType] = useState("response"); // "response", "contact", "kafka"
  
  const [searchParam, setSearchParam] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper Function for chage the brand
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setApiResponse(null);
    setSearchParam("");
    console.log(brand);
  };

  // Helper Function for log type
  const handleLogTypeChange = (type) => {
    setLogType(type);
    setApiResponse(null);
    // setKafka(false); // ไม่ต้องใช้แล้ว เพราะคุมด้วย logType ตัวเดียว
    console.log(type);
  };

  return (
    <>
      <header>
        <div className="flex flex-row justify-center items-center p-4 text-white">
          <WelcomeMessage />
        </div>
      </header>
      <section>
        <div className="grid grid-cols-1 gap-4 m-10">
          
          {/* --- Brand Selection --- */}
          <div className="flex flex-row gap-4 justify-start items-center">
            <button
              onClick={() => handleBrandChange("TRUE")}
              className={`transition delay-100 duration-200 ease-in-out font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-red-200 hover:bg-red-400 focus:ring-3 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-red-400 dark:focus:ring-red-700 
                ${selectedBrand === "TRUE" ? "ring-4 ring-red-100 bg-red-500" : "bg-zinc-600 text-gray-400"}`}
            >
              TRUE
            </button>
            <button
              onClick={() => handleBrandChange("DTAC")}
              className={`transition delay-100 duration-200 ease-in-out font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-blue-200 hover:bg-blue-400 focus:ring-3 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-blue-400 dark:focus:ring-blue-700 
                ${selectedBrand === "DTAC" ? "ring-4 ring-blue-200 bg-blue-500" : "bg-zinc-600 text-gray-400"}`}
            >
              DTAC
            </button>
            <button
              disabled={true}
              className={`transition delay-100 duration-200 ease-in-out font-stretch-105% cursor-pointer font-semibold text-gray-100 bg-blue-200 hover:bg-blue-400 focus:ring-3 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 focus:ring-blue-400 dark:focus:ring-blue-700 
                ${selectedBrand === "TOL" ? "ring-4 ring-blue-500 bg-blue-500" : "bg-zinc-600 text-gray-400"}`}
            >
              TOL
            </button>
          </div>

          {/* --- Log Type Selection & Export --- */}
          {selectedBrand !== "TOL" && (
            <div className="flex flex-row gap-4 justify-start items-center">
              
              <button
                onClick={() => handleLogTypeChange("response")}
                className={`transition delay-100 duration-200 ease-in-out cursor-pointer text-gray-700 hover:bg-green-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 
                ${logType === "response" ? "ring-4 ring-emerald-500 bg-green-400" : "bg-zinc-600 text-gray-400"}`}
              >
                Response History
              </button>

              <button
                onClick={() => handleLogTypeChange("contact")}
                className={`transition delay-100 duration-200 ease-in-out cursor-pointer text-gray-700 hover:bg-orange-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-orange-400 dark:focus:ring-orange-400 
                ${logType === "contact" ? "ring-4 ring-orange-400 bg-orange-300" : "bg-zinc-600 text-gray-400"}`}
              >
                Contact History
              </button>

              <button
                disabled={true}
                className={`text-gray-100 hover:bg-zinc-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 focus:ring-rose-400 dark:focus:ring-rose-400 
                ${logType === "kafka" ? "ring-4 ring-rose-400" : "bg-zinc-700"}`}
              >
                Kafka
              </button>

              <ExportFile data={apiResponse} />
            </div>
          )}

          {/* --- Input Form --- */}
          <InputForm
            brand={selectedBrand}
            log={logType}
            value={searchParam}
            setValue={setSearchParam}
            onApiResponse={setApiResponse}
            setLoading={setIsLoading}
          />
        </div>
      </section>

      <section>
        <div>
          <div className="m-10 justify-center items-center text-left text-white">
            {(apiResponse || isLoading) && logType === "response" && (
              <ResponseTable data={apiResponse} isLoading={isLoading} />
            )}

            {(apiResponse || isLoading) && logType === "contact" && (
              <ContactTable data={apiResponse} isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;