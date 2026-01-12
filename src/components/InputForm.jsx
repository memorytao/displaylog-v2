import { FaSearch, FaSpinner } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";

const SEARCH_PLACEHOLDER = 'Search... ( "," for single search ";" for multiple search )'

const InputForm = ({ value, setValue, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-row items-center rounded-md p-2 gap-2 bg-[#262833] w-full h-15 relative">
        <div>
          {isLoading ? (
            <FaSpinner className="text-gray-300 text-2xl ml-2 animate-spin" />
          ) : (
            <FaSearch className="text-gray-300 text-2xl ml-2" />
          )}
        </div>
        <input
          disabled={isLoading}
          className="w-full outline-none text-2xl ml-2 text-gray-300 placeholder-gray-600 bg-transparent pr-8"
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-3"
            tabIndex={-1}
            disabled={isLoading}
          >
            <MdOutlineClear className="h-9 w-9 text-white cursor-pointer hover:text-red-400 transition" />
          </button>
        )}
      </div>
    </form>
  );
};

export default InputForm;