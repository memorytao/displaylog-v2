import { useState } from "react";
import "./App.css";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";

// Import Components
import WelcomeMessage from "./pages/Welcome";
import ResponseTable from "./pages/ResponseTable";
import ContactTable from "./pages/ContactTable";
import InputForm from "./components/InputForm";
import ExportFile from "./components/ExportFile";
import Pagination from "./components/Pagination";

import TOLResponseTable from "./pages/TOLResponseTable";
import TOLContactTable from "./pages/TOLContactTable";

// Import Hooks
import { useLogSearch } from "./hooks/useLogSearch";

const BRANDS = ["DTAC", "TRUE", "TOL"];
const PAGE_SIZE = 450;
const HOW_TO_USE = `"," is AND operation. ";" is OR operation. \n You can use regular expression for advanced search.`;

function App() {
  // --- States ---
  const [brand, setBrand] = useState("DTAC"); // "TRUE" | "DTAC" | "TOL"
  const [logType, setLogType] = useState("response"); // "response" | "contact"
  const [searchParam, setSearchParam] = useState("");
  const [filterParam, setFilterParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Hooks ---
  const { data, isLoading, searchLogs, clearData } = useLogSearch();

  // --- Handlers ---
  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    setSearchParam("");
    setCurrentPage(1);
    clearData();
  };

  const handleLogTypeChange = (newType) => {
    setLogType(newType);
    setCurrentPage(1);
    clearData();
  };

  const handleSearch = (e, targetPage = 1) => {
    if (e) e.preventDefault(); // ถ้ากดปุ่ม Search ให้กัน refresh

    if (!searchParam.trim()) {
      alert("Please enter a search term.");
      return;
    }

    const start = ((targetPage - 1) * PAGE_SIZE) + 1;
    const end = targetPage * PAGE_SIZE;

    console.log(`Fetching Page ${targetPage}: Start ${start} -> End ${end}`);

    searchLogs({
      brand,
      log: logType,
      value: searchParam,
      start: start,
      end: end
    });

    setCurrentPage(targetPage);
  };

  const onPageChange = (newPage) => {
    handleSearch(null, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top on page change
  };

  // --- Helper Components (Tooltip & LogType Buttons) ---
  const HowToUseTooltip = () => {
    return (
      <div className="relative group w-fit">
        <TbAlertSquareRoundedFilled className="text-amber-300 text-2xl cursor-help" />
        <div className="absolute left-8 top-0 ml-2 w-max max-w-xs px-3 py-2 bg-slate-700 text-white text-xs rounded-md shadow-lg 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-200 ease-in-out z-50 whitespace-pre-wrap">
          {HOW_TO_USE}
        </div>
      </div>
    );
  };

  const MobileLogButtons = () => (
    <>
      <button
        onClick={() => handleLogTypeChange("response")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
          ${logType === "response"
            ? "bg-green-500 text-white shadow-lg scale-105"
            : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
      >
        Response History
      </button>

      <button
        onClick={() => handleLogTypeChange("contact")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
          ${logType === "contact"
            ? "bg-orange-500 text-white shadow-lg scale-105"
            : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
      >
        Contact History
      </button>
    </>
  );

  const TOLLogButtons = () => (
    <>
      <button
        onClick={() => handleLogTypeChange("response")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
          ${logType === "response"
            ? "bg-green-500 text-white shadow-lg scale-105"
            : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
      >
        TOL Response History
      </button>

      <button
        onClick={() => handleLogTypeChange("contact")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
          ${logType === "contact"
            ? "bg-orange-500 text-white shadow-lg scale-105"
            : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
      >
        TOL Contact History
      </button>
    </>
  );

  return (
    <>
      <header>
        <div className="flex flex-row justify-center items-center p-4 text-white">
          <WelcomeMessage />
        </div>
      </header>

      {/* --- Section 1: Filters & Search --- */}
      <section className="w-[98%] mx-auto grid grid-cols-1 gap-6">

        <HowToUseTooltip />

        {/* 1. Brand Selection */}
        <div className="flex flex-row gap-3 justify-start items-center">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => handleBrandChange(b)}
              className={`transition duration-150 ease-in-out font-semibold text-gray-100 rounded-lg text-lg px-5 py-2.5 shadow-md
                ${brand === b
                  ? (b === "TRUE" ? "bg-red-500 scale-105 ring-2 ring-red-300"
                    : b === "DTAC" ? "bg-blue-500 scale-105 ring-2 ring-blue-300"
                      : "bg-gradient-to-r from-pink-500 to-cyan-500 scale-105 ring-2 ring-pink-300")
                  : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* 2. Log Type Selection */}
        <div className="flex flex-row gap-3 justify-start items-center w-full">
          {brand !== "TOL" ? <MobileLogButtons /> : <TOLLogButtons />}

          <button disabled className="bg-zinc-700 text-gray-500 rounded-lg text-lg px-5 py-2.5 cursor-not-allowed opacity-50">
            Kafka
          </button>

          <div className="ml-auto">
            <ExportFile data={data} />
          </div>
        </div>

        {/* 3. Search Form */}
        <InputForm
          value={searchParam}
          setValue={setSearchParam}
          onSubmit={(e) => handleSearch(e, 1)}
          isLoading={isLoading}
        />
      </section>

      {/* --- Section 2: Table & Pagination --- */}
      <section>

        <div className="w-[98%] mx-auto mb-10 mt-0.5 text-left text-white">

          {(data || isLoading) && (
            <>
              {logType === "response" && brand !== "TOL" && <ResponseTable data={data} isLoading={isLoading} />}
              {logType === "contact" && brand !== "TOL" && <ContactTable data={data} isLoading={isLoading} />}
              {logType === "response" && brand === "TOL" && <TOLResponseTable data={data} isLoading={isLoading} />}
              {logType === "contact" && brand === "TOL" && <TOLContactTable data={data} isLoading={isLoading} />}
            </>
          )}

          {/* Pagination */}
          {(data || isLoading) && (
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              hasData={data?.response && data.response.length > 0}
              isLoading={isLoading}
            />
          )}

        </div>
      </section>
    </>
  );
}

export default App;