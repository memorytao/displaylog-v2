import { FaSearch } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { API_BASE_URL } from "../constants/url";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const SEARCH = 'Search... \t (  "," for AND operation ";" for OR operation  )'

const TIMEOUT_DURATION = 5000;

const InputForm = ({ brand, log, value: searchParam, setValue, onApiResponse, start = 1, end = 80 }) => {

  const [isDisabled, setIsDisabled] = useState(false);

  const setDefault = () => {
    setIsDisabled(false);
  }

  const submitSearch = (e) => {
    e.preventDefault();

    setIsDisabled(true);
    console.log("brand", brand, "log:", log, "searchParam", searchParam);

    let body = {
      brand: brand,
      log: log,
      value: searchParam,
      start: start,
      end: end,
    };

    if (searchParam.trim() === "") {
      alert("Please enter a search term.");
      setDefault();
      return;
    }

    console.log("body req: ", body);

    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_DURATION);

    fetch(`${API_BASE_URL}/api/v1/getlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        setDefault();
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data.response.length);

        onApiResponse(data);
      })
      .catch((err) => {

        if (err.name === 'AbortError') {
          alert("Connection Timed Out! Please try again.");
          setDefault();
        } else {
          console.error("API error:", err);
          setDefault();
          alert(`Something went wrong: ${err.message}`);
        }
      });
  };

  return (
    <form onSubmit={submitSearch}>
      <div className="flex flex-row items-center rounded-md p-2 gap-2 bg-[#262833] w-full h-15 relative">
        <div>
          {
            isDisabled ? <FaSpinner className="text-gray-300 text-2xl ml-2 animate-spin" /> : <FaSearch className="text-gray-300 text-2xl ml-2" />
          }
        </div>
        <input
          disabled={isDisabled}
          className="w-full outline-none text-2xl ml-2 text-gray-300 placeholder-gray-600 bg-transparent pr-8"
          type="text"
          name="search"
          id="search"
          placeholder={SEARCH}
          value={searchParam}
          onChange={(e) => setValue(e.target.value)}
        />
        {searchParam && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-3"
            tabIndex={-1}
            aria-label="Clear input"
          >
            <MdOutlineClear className="h-9 w-9 text-white cursor-pointer" />
          </button>
        )}
      </div>
    </form>
  );
};

export default InputForm;