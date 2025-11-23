import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../utl/url";

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
      body: JSON.stringify(body),
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

export default InputForm;
