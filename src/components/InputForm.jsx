import { FaSearch } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { API_BASE_URL } from "../constants/url";

const SEARCH = 'Search... \t (  "," for AND operation ";" for OR operation  )'

const InputForm = ({ brand, log, value: searchParam, setValue, onApiResponse }) => {
  const submitSearch = (e) => {
    e.preventDefault();
    console.log("brand", brand, "log:", log, "searchParam", searchParam);

    let body = {
      brand: brand,
      log: log,
      value: searchParam,
    };

    console.log("body req: ", body);

    fetch(`${API_BASE_URL}/api/v1/getlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("API response:", data.response.length);
        onApiResponse(data);
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
