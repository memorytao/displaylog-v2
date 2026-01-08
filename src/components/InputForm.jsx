import { FaSearch } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { API_BASE_URL } from "../constants/url";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const SEARCH = 'Search... \t (  "," for AND operation ";" for OR operation  )'

const TIMEOUT_DURATION = 60000;

// รับ prop setLoading เพิ่มเข้ามา
const InputForm = ({ brand, log, value: searchParam, setValue, onApiResponse, start = 1, end = 450, setLoading }) => {

  const [isDisabled, setIsDisabled] = useState(false);

  const setDefault = () => {
    setIsDisabled(false);
    // สั่งปิด Loading (Skeleton) เมื่อทำงานเสร็จ
    if (setLoading) setLoading(false);
  }

  const submitSearch = (e) => {
    e.preventDefault();

    // ย้ายการเช็คค่าว่างมาไว้ก่อน เพื่อไม่ให้ Trigger Loading ถ้าไม่มี input
    if (searchParam.trim() === "") {
      alert("Please enter a search term.");
      return;
    }

    setIsDisabled(true);
    // สั่งเปิด Loading (Skeleton) ที่ App.js
    if (setLoading) setLoading(true);

    console.log("brand", brand, "log:", log, "searchParam", searchParam);

    let body = {
      brand: brand,
      log: log,
      value: searchParam,
      start: start,
      end: end,
    };

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
        // เช็ค status ก่อนแปลง json เผื่อ backend ส่ง error มา
        if (!res.ok) {
           throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data.response?.length || 0);
        onApiResponse(data);
        setDefault(); // ปิด Loading
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          alert("Connection Timed Out! Please try again.");
        } else {
          console.error("API error:", err);
          alert(`Something went wrong: ${err.message}`);
        }
        setDefault(); // ปิด Loading กรณี Error
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
            {isDisabled ? null : <MdOutlineClear className="h-9 w-9 text-white cursor-pointer" />}

          </button>
        )}
      </div>
    </form>
  );
};

export default InputForm;