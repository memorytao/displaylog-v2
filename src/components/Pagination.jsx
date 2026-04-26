import React from 'react';

const Pagination = ({
  currentPage,
  onPageChange,
  rowPerPage,
  onRowPerPageChange, // 1. รับ Prop ตัวใหม่เข้ามา
  hasData,
  isLoading
}) => {

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasData) {
      onPageChange(currentPage + 1);
    }
  };


  const handleInputChange = (e) => {
    let val = String(e.target.value);

    // --- จุดที่เพิ่ม: ตัดตัวเลขให้เหลือแค่ 5 ตัว ---
    if (val.length > 5) {
      val = val.slice(0, 5);
    }

    if (val === '') {
      onRowPerPageChange('');
    } else {
      onRowPerPageChange(Number(val));
    }
  };

  // 3. ป้องกันการกด Enter ในช่อง input แล้วเผลอไป submit ฟอร์มอื่น
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // บังคับให้เริ่มค้นหาใหม่ที่หน้า 1 ทันทีเมื่อเปลี่ยนจำนวนบรรทัดเสร็จ
      if (rowPerPage > 0) {
        onPageChange(1);
      }
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

      {/* ช่อง Input สำหรับเปลี่ยน Row Per Page */}
      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm">Rows:</label>
        <input
          type="number"
          max={99999}
          min="1"
          value={rowPerPage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="w-20 py-2 text-center rounded-lg border border-gray-400 bg-[#262833] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
          title="Press Enter to apply"
        />
      </div>

      {/* เลขหน้าปัจจุบัน */}
      <div className="text-white font-mono text-lg px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
        Page {currentPage}
      </div>

      {/* ปุ่ม Next */}
      <button
        onClick={handleNext}
        disabled={!hasData || isLoading}
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