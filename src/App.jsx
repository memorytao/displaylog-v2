import { useState } from "react";
import { FaFilter, FaRegLightbulb } from "react-icons/fa";
import "./App.css";

// Import Components
import ExportFile from "./components/ExportFile";
import InputForm from "./components/InputForm";
import Pagination from "./components/Pagination";
import ContactTable from "./pages/ContactTable";
import ResponseTable from "./pages/ResponseTable";
import WelcomeMessage from "./pages/Welcome";

import TOLContactTable from "./pages/TOLContactTable";
import TOLResponseTable from "./pages/TOLResponseTable";

// Import Hooks
import { useLogSearch } from "./hooks/useLogSearch";
import GetAOResponse from "./pages/GetAOResponse";
import { HiOutlineLightBulb } from "react-icons/hi";
import GetAORequest from "./pages/GetAORequest";

// const WIDTH = "w-[95vw] mx-auto";
const WIDTH = "w-[96vw] relative left-1/2 -translate-x-1/2 px-15 mx-auto";
const BRANDS = ["DTAC", "TRUE", "TOL"];

// 1. แปลง HOW_TO_USE เป็น Array เพื่อให้จัดบรรทัดได้ง่ายขึ้น
const HOW_TO_USE = [
  "1. You can use Regex for advanced search.",
  "2. Double click on header to copy all headers.",
  "3. Click once to sort by that column.",
  "4. Click row to copy that row.",
  "5. \",\" is AND operation. \";\" is OR operation."
];

function App() {
  // --- States ---
  const [brand, setBrand] = useState("DTAC");
  const [logType, setLogType] = useState("response");
  const [searchParam, setSearchParam] = useState("");
  const [filterParam, setFilterParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(450);
  const [notToday, setNotToday] = useState(false);
  // --- Hooks ---
  const { data, isLoading, searchLogs, clearData } = useLogSearch();

  // --- Handlers ---
  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    setSearchParam("");
    setFilterParam("");
    setCurrentPage(1);
    setRowPerPage(450);
    clearData();
  };

  const handleLogTypeChange = (newType) => {
    setLogType(newType);
    setFilterParam("");
    setCurrentPage(1);
    setRowPerPage(450);
    clearData();
  };

  const handleSearch = (e, targetPage = 1) => {
    if (e) e.preventDefault();
    setFilterParam("");
    if (!searchParam.trim()) {
      alert("Please enter a search term.");
      return;
    }

    const limit = rowPerPage || 450;
    let start = ((targetPage - 1) * limit) + 1;
    let end = targetPage * limit;
    let params = searchParam.trim();

    console.log(`Fetching Page ${targetPage}: Start ${start} -> End ${end}`);

    if (logType === "aoRequest" || logType === "aoResponse") {
      start = 1;
      end = 1;

      if (notToday) {
        params = searchParam + "+gz";
      }
    }

    searchLogs({
      brand,
      log: logType,
      value: params,
      start: start,
      end: end
    });

    setCurrentPage(targetPage);
  };

  const onPageChange = (newPage) => {
    handleSearch(null, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Helper Components ---

  // 2. ปรับ Tooltip ให้แสดงผลแบบ Flexbox เพื่อให้ตัวหนังสือตรงกัน

  const HowToUseTooltip = () => {
    return (
      <div className="relative group w-fit">
        {/* 🔥 Trigger */}
        <div
          className="
          text-md font-semibold cursor-help
          relative select-none text-md
          animate-[float_1.2s_ease-in-out_infinite]
          group-hover:animate-none
          transition-transform duration-200
          group-hover:scale-110
        "
        >
          <div className="flex items-center gap-1 animate-bounce">
            <HiOutlineLightBulb className="text-amber-200 mr-1.5 text-4xl" /> <span className="text-white mr-4"> How to</span>
          </div>
          {/* Glow */}
          <span
            className="
            absolute inset-0
            blur-xl opacity-70
            bg-amber-400/80
            -z-10
          "
          />
        </div>

        {/* 🧾 Tooltip */}
        <div
          className="
          absolute left-12 top-0 ml-2
          w-max max-w-sm
          px-4 py-3
          bg-slate-800/85 backdrop-blur-sm
          text-white text-sm
          rounded-md shadow-xl z-50
          origin-left

          opacity-0 invisible
          translate-x-[-8px] scale-95

          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-x-0
          group-hover:scale-100

          transition-all duration-200 ease-out
        "
        >
          <ul className="space-y-1">
            {HOW_TO_USE.map((text, index) => {
              const firstDotIndex = text.indexOf(".");
              const numberPart = text.slice(0, firstDotIndex + 1);
              const textPart = text.slice(firstDotIndex + 1).trim();

              return (
                <li key={index} className="flex text-left">
                  <span className="mr-2 shrink-0 font-semibold">
                    {numberPart}
                  </span>
                  <span>{textPart}</span>
                </li>
              );
            })}
          </ul>

          {/* ◀ Arrow */}
          <div
            className="
            absolute left-0 top-3 -ml-1
            w-2 h-2 bg-slate-700 rotate-45
          "
          />
        </div>


      </div>
    );
  };

  const ToggleToday = ({ notToday, setNotToday }) => {
    return (
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setNotToday(!notToday)}
          className={`
          relative inline-flex h-5 w-9 items-center rounded-full
          transition-colors duration-300 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
          ${notToday ? "bg-emerald-500" : "bg-gray-400"}
        `}
        >
          {/* Knob */}
          <span
            className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            shadow-sm transition-transform duration-300 ease-out
            ${notToday ? "translate-x-4" : "translate-x-0.5"}
          `}
          />
        </button>

        <span className="select-none text-sm font-medium text-white">
          Not Today
        </span>
      </div>
    );
  };



  const GetAOLogButtons = () => (
    <>
      <button
        onClick={() => handleLogTypeChange("aoResponse")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
          ${logType === "aoResponse"
            ? "bg-green-500 text-white shadow-lg scale-105"
            : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
      >
        Get AO Response
      </button>

      <button
        onClick={() => handleLogTypeChange("aoRequest")}
        className={`transition duration-200 font-medium rounded-lg text-lg px-5 py-2.5 
          ${logType === "aoRequest"
            ? "bg-orange-500 text-white shadow-lg scale-105"
            : "bg-zinc-600 text-gray-400 hover:bg-zinc-500 hover:scale-105 hover:text-white"}`}
      >
        Get AO Request
      </button>
    </>
  );


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

      <GetAOLogButtons />
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
      <section className={`${WIDTH} grid grid-cols-1 gap-6 mt-6`}>

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

        {
          (logType === "aoResponse" || logType === "aoRequest") &&
          (<ToggleToday notToday={notToday} setNotToday={setNotToday} />)

        }


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

        {/* === ส่วน Filter (Client Side) === */}
        {(data?.response?.length > 0 && logType !== "aoRequest" && logType !== "aoResponse") && (
          <div className={`${WIDTH} mt-6 flex justify-end`}>
            <div className="flex flex-row items-center rounded-md p-2 gap-2 bg-[#262833] h-12 w-[300px] border border-slate-600/50 focus-within:border-slate-400 transition-colors">
              <FaFilter className="text-gray-400 text-lg ml-2" />
              <input
                type="text"
                className="outline-none text-lg text-gray-300 placeholder-gray-500 bg-transparent w-full pr-2"
                placeholder="Filter displayed data..."
                value={filterParam}
                onChange={(e) => setFilterParam(e.target.value)}
              />
            </div>
          </div>
        )
        }

        {/* === ส่วนแสดงผลข้อมูล === */}
        <div className={`${WIDTH} mb-10 mt-4 text-left text-white`}>

          {(data || isLoading) && (
            <>
              {logType === "response" && brand !== "TOL" && <ResponseTable data={data} isLoading={isLoading} filterText={filterParam} />}
              {logType === "contact" && brand !== "TOL" && <ContactTable data={data} isLoading={isLoading} filterText={filterParam} />}
              {logType === "response" && brand === "TOL" && <TOLResponseTable data={data} isLoading={isLoading} filterText={filterParam} />}
              {logType === "contact" && brand === "TOL" && <TOLContactTable data={data} isLoading={isLoading} filterText={filterParam} />}
              {logType === "getAOcontact" && brand === "TOL" && <TOLContactTable data={data} isLoading={isLoading} filterText={filterParam} />}
              {logType === "getAOresponse" && brand === "TOL" && <TOLResponseTable data={data} isLoading={isLoading} filterText={filterParam} />}
              {logType === "aoResponse" && <GetAOResponse data={data} isLoading={isLoading} />}
              {logType === "aoRequest" && <GetAORequest data={data} isLoading={isLoading} />}
            </>
          )}

          {/* Pagination */}
          {((data || isLoading) && logType !== "aoRequest" && logType !== "aoResponse") && (
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              rowPerPage={rowPerPage}
              onRowPerPageChange={setRowPerPage}
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
