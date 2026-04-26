import { useMemo, useState } from "react";
import TableLayout from "../components/common/TableLayout";
import { RESPONSE_FIELD } from "../constants/fields";
import { copyToClipboard } from "../utils/clipboard";

const RESPONSE_FIELDS = RESPONSE_FIELD.split("|");
const TARGET_KEYS = ["AGW01", "AGW02", "AGW03", "AGW04"];

const ResponseTable = ({ data, isLoading, filterText }) => {

  // 1. เพิ่ม State สำหรับเก็บสถานะการ Sort
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // transform data from server
  const rawRows = useMemo(() => {
    const responseArray = data?.response || [];
    return responseArray.flatMap((item) => {
      return TARGET_KEYS.flatMap((key) => {
        const content = item[key];
        if (!content) return [];
        return content.split("\n").filter((r) => r.trim() !== "").map((r) => {
          const parts = r.split(":");
          // filename, data..., server
          return [parts[0], ...parts.slice(1).join(":").split("|"), key];
        });
      });
    });
  }, [data]);

  // กรองข้อมูล (Filtering) -> filteredRows
  // ทำงานเมื่อ rawRows เปลี่ยน หรือ filterText เปลี่ยน
  const filteredRows = useMemo(() => {
    // ถ้าไม่มีคำค้นหา ให้คืนค่าข้อมูลดิบไปเลย
    if (!filterText || filterText.trim() === "") {
      return rawRows;
    }

    const lowerFilter = filterText.toLowerCase();

    // วนลูปทุกแถว เช็คว่ามี cell ไหนที่มีคำค้นหาบ้าง
    return rawRows.filter((row) =>
      row.some((cell) => String(cell).toLowerCase().includes(lowerFilter))
    );
  }, [rawRows, filterText]);

  // 2. เพิ่ม Logic เรียงลำดับ (Sorting) -> sortedRows
  // เรียงต่อจากข้อมูลที่ผ่านการกรองมาแล้ว (filteredRows)
  const sortedRows = useMemo(() => {
    let sortableItems = [...filteredRows];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        const numA = parseFloat(valA);
        const numB = parseFloat(valB);

        if (!isNaN(numA) && !isNaN(numB)) {
          valA = numA;
          valB = numB;
        } else {
          valA = String(valA).toLowerCase();
          valB = String(valB).toLowerCase();
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredRows, sortConfig]);

  // 3. เพิ่มฟังก์ชันจัดการคลิกเปลี่ยนคอลัมน์เรียงลำดับ
  const requestSort = (keyIndex) => {
    let direction = 'asc';
    if (sortConfig.key === keyIndex && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: keyIndex, direction });
  };

  const handleCopyRow = (row) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    copyToClipboard(row.join("|"));
  };

  const renderCell = (cell, index) => {
    const strCell = String(cell);
    if (index === 4) return <span className="font-mono text-lg font-normal bg-gradient-to-r from-teal-400 to-yellow-300 bg-clip-text text-transparent">{cell}</span>;
    if (index === 10) return <span className={`font-mono text-lg ${strCell.includes("DTAC") ? "text-cyan-400 font-semibold" : strCell.includes("TRUE") ? "text-rose-400 font-semibold" : ""}`}>{cell}</span>;
    if (index === 16) return <span className={`font-mono text-lg font-normal ${cell === "FULS" || strCell.toUpperCase() === "SUCCESS" ? "text-green-400" : "text-red-500"}`}>{cell}</span>;
    if (index === 17) return <span className="font-mono text-lg text-red-500">{cell}</span>;
    if (index === 18) return <span className={`font-mono text-lg min-w-[300px] max-w-[500px] whitespace-normal break-words leading-relaxed ${cell.length > 0 && strCell.toUpperCase() !== 'SUCCESS' ? "text-red-500" : ""}`}>{cell}</span>;
    if (index === 29) return <span className="font-mono text-lg font-normal">{strCell.slice(0, 19)}</span>;
    return <span className="font-mono text-lg">{cell}</span>;
  };

  return (
    <TableLayout
      headers={RESPONSE_FIELDS}
      isLoading={isLoading}
      isEmpty={sortedRows.length === 0} // เปลี่ยนเป็นเช็คจาก sortedRows
      onSort={requestSort}              // 4. เปิดใช้งาน Prop onSort
      sortConfig={sortConfig}           // 5. เปิดใช้งาน Prop sortConfig
    >
      {/* 6. ใช้ sortedRows (ที่ผ่านทั้งการกรองและการเรียงแล้ว) มาแสดงผล */}
      {sortedRows.map((row, rIdx) => (
        <tr key={rIdx} onClick={() => handleCopyRow(row)} className="divide-x divide-slate-700 hover:bg-slate-700/50 active:bg-slate-600 transition-colors cursor-pointer duration-150">
          {row.map((cell, cIdx) => (
            <td key={cIdx} className="px-4 py-2 whitespace-nowrap pl-7 pr-7 pt-3 pb-3 border-b border-slate-700/50">
              {renderCell(cell, cIdx)}
            </td>
          ))}
        </tr>
      ))}
    </TableLayout>
  );
};

export default ResponseTable;