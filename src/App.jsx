import { useState } from "react";
import "./App.css";
import { TbAlertCircle } from "react-icons/tb";
// Import Components
import WelcomeMessage from "./pages/Welcome";
import ResponseTable from "./pages/ResponseTable";
import ContactTable from "./pages/ContactTable";
import InputForm from "./components/InputForm";
import ExportFile from "./components/ExportFile";

// Import Hooks
import { useLogSearch } from "./hooks/useLogSearch";
import TOLResponseTable from "./pages/TOLResponseTable";
import TOLContactTable from "./pages/TOLContactTable";


const BRANDS = ["DTAC", "TRUE", "TOL"];

const HOW_TO_USE = `"," is AND operation. ";" is OR operation. `

function App() {
  const [brand, setBrand] = useState("DTAC"); // "TRUE" | "DTAC" | "TOL"
  const [logType, setLogType] = useState("response"); // "response" | "contact"
  const [searchParam, setSearchParam] = useState("");

  // call hook
  const { data, isLoading, searchLogs, clearData } = useLogSearch();

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    setSearchParam("");
    clearData();
  };

  const handleLogTypeChange = (newType) => {
    setLogType(newType);
    clearData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchParam.trim()) {
      alert("Please enter a search term.");
      return;
    }

    searchLogs({
      brand,
      log: logType,
      value: searchParam,
      start: 1,
      end: 450
    });
  };

  const HowToUser = () => {

    return <>
      <div className="relative group">
        <TbAlertCircle className="text-slate-200 text-xl cursor-help" />
        <div
          className="absolute bottom-full p-5 ml-20
                transform -translate-x-1/2 
                text-sm text-white
                bg-gray-700 rounded shadow-lg 
                opacity-0 group-hover:opacity-100">
          {HOW_TO_USE}
        </div>
      </div>
    </>
  }

  const MobileLog = () => {
    return <>
      <button
        onClick={() => handleLogTypeChange("response")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
      ${logType === "response" ? "bg-green-500  text-white" : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-110 "}`}
      >
        Response History
      </button>

      <button
        onClick={() => handleLogTypeChange("contact")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
      ${logType === "contact" ? "bg-orange-500 text-white" : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-110"}`}
      >
        Contact History
      </button>
    </>
  }


  const TOLLog = () => {

    return <>
      <button
        onClick={() => handleLogTypeChange("response")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
      ${logType === "response" ? "bg-green-500  text-white" : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-110 "}`}
      >
        TOL Response History
      </button>

      <button
        onClick={() => handleLogTypeChange("contact")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
      ${logType === "contact" ? "bg-orange-500 text-white" : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-110"}`}
      >
        TOL Contact History
      </button>
    </>
  }

  return (
    <>
      <header>
        <div className="flex flex-row justify-center items-center p-4 text-white">
          <WelcomeMessage />
        </div>
      </header>

      <section className="m-10 grid grid-cols-1 gap-6">

        <HowToUser />
        {/* --- 1. Brand Selection --- */}
        <div className="flex flex-row gap-3 justify-start items-center">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => handleBrandChange(b)}
              className={`transition duration-150 ease-in-out font-semibold text-gray-100 rounded-lg text-lg px-5 py-2.5 cursor-pointer
      ${brand === b
                  ? (b === "TRUE" ? "bg-red-500" : b === "DTAC" ? "bg-blue-500" : "bg-gradient-to-r from-pink-500 to-cyan-500")
                  : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-110"}`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* --- 2. Log Type Selection --- */}
        <div className="flex flex-row gap-3 justify-start items-center w-full">
          {
            brand !== "TOL" ?
              <MobileLog /> : <TOLLog />
          }

          <button disabled className="bg-zinc-700 text-gray-500 rounded-lg text-lg px-5 py-2.5 cursor-not-allowed">
            Kafka
          </button>

          <div className="ml-auto">
            <ExportFile data={data} />
          </div>

        </div>

        {/* --- 3. Search Form --- */}
        <InputForm
          value={searchParam}
          setValue={setSearchParam}
          onSubmit={handleSearch}
          isLoading={isLoading}
        />
      </section>

      {/* --- 4. Table Display --- */}
      <section>
        <div className="m-10 text-left text-white">
          {(data || isLoading) && logType === "response" && brand !== "TOL" && (
            <ResponseTable data={data} isLoading={isLoading} />
          )}

          {(data || isLoading) && logType === "contact" && brand !== "TOL" && (
            <ContactTable data={data} isLoading={isLoading} />
          )}

          {(data || isLoading) && logType === "response" && brand === "TOL" && (
            <TOLResponseTable data={data} isLoading={isLoading} />
          )}

          {(data || isLoading) && logType === "contact" && brand === "TOL" && (
            <TOLContactTable data={data} isLoading={isLoading} />
          )}
        </div>
      </section>
    </>
  );
}

export default App;