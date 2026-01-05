const Pagination = ({ onApiResponse }) => {

  const handlePrevious = () => {

    console.log("Previous page");
  };

  const handleNext = () => {

    console.log("Next page");
  };

  return (
    <nav className="flex items-center justify-center mt-4">
      {onApiResponse && sessionStorage.getItem('start') > 40 ? (<button
        onClick={handlePrevious}
        className="btn btn-outline text-white border-2 rounded-lg bg-gray-500 border-gray-400 p-2 hover:bg-gray-300 cursor-pointer"
      >
        Previous
      </button>) : null
      }
      <div className="btn btn-outline text-white mx-2"></div>
      <button
        onClick={handleNext}
        className="btn btn-outline text-white border-2 rounded-lg bg-gray-500 border-gray-400 pr-3 pl-3 p-2 hover:bg-gray-300 cursor-pointer"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
