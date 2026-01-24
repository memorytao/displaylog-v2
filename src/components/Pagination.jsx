import React from 'react';

const Pagination = ({ currentPage, onPageChange, hasData, isLoading }) => {

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    // เงื่อนไข: ถ้ามีข้อมูลในหน้าปัจจุบัน ให้ไปต่อได้ (หรือท่านอาจเช็ค total record จาก API ก็ได้ถ้ามี)
    if (hasData) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center justify-center mt-6 gap-4">
      {/* ปุ่ม Previous */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
          ${currentPage === 1 || isLoading
            ? "border-gray-600 text-gray-600 cursor-not-allowed bg-transparent"
            : "border-gray-400 text-white bg-gray-700 hover:bg-gray-600 hover:border-white cursor-pointer"
          }`}
      >
        Previous
      </button>

      {/* เลขหน้าปัจจุบัน */}
      <div className="text-white font-mono text-lg px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
        Page {currentPage}
      </div>

      {/* ปุ่ม Next */}
      <button
        onClick={handleNext}
        disabled={!hasData || isLoading} // ถ้าไม่มีข้อมูล หรือกำลังโหลด ให้กดไม่ได้
        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
          ${!hasData || isLoading
            ? "border-gray-600 text-gray-600 cursor-not-allowed bg-transparent"
            : "border-gray-400 text-white bg-gray-700 hover:bg-gray-600 hover:border-white cursor-pointer"
          }`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;