import { useMemo, useState } from "react";
import TableLayout from "../components/common/TableLayout";
import { CONTACT_FIELD } from "../constants/fields";
import { copyToClipboard } from "../utils/clipboard";

const CONTACT_FIELDS = CONTACT_FIELD.split("|");
const TARGET_KEYS = ["AGW01", "AGW02", "AGW03", "AGW04"];

const ContactTable = ({ data, isLoading, filterText }) => {

    // 1. State สำหรับเก็บสถานะการ Sort
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
                    return [parts[0], ...parts.slice(1).join(":").split("|"), key];
                });
            });
        });
    }, [data]);

    // 2. กรองข้อมูล (Filtering)
    const filteredRows = useMemo(() => {
        if (!filterText || filterText.trim() === "") {
            return rawRows;
        }
        const lowerFilter = filterText.toLowerCase();
        return rawRows.filter((row) =>
            row.some((cell) => String(cell).toLowerCase().includes(lowerFilter))
        );
    }, [rawRows, filterText]);

    // 3. เรียงลำดับ (Sorting)
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

    // 4. ฟังก์ชันสั่ง Sort
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
        if (index === 9 || index === 10) return <span className={`font-mono text-lg ${strCell.includes("DTAC") ? "text-cyan-400 font-semibold" : strCell.includes("TRUE") ? "text-rose-400 font-semibold" : ""}`}>{cell}</span>;
        if (index === 23) return <span className="font-mono text-lg font-thin min-w-[300px] max-w-[500px] whitespace-normal break-words leading-relaxed text-yellow-300">{cell}</span>;
        if (index === 27) return <span className={`font-mono text-lg font-semibold ${cell === "FULS" || strCell.toUpperCase() === "SUCCESS" ? "text-green-400" : "text-red-400"}`}>{cell}</span>;
        if (index === 19 || index === 29) return <span className="font-mono text-lg font-normal">{strCell.slice(0, 19)}</span>;
        return <span className="font-mono text-lg">{cell}</span>;
    };

    return (
        <TableLayout
            headers={CONTACT_FIELDS}
            isLoading={isLoading}
            isEmpty={sortedRows.length === 0}
            onSort={requestSort}     // เปิดใช้ onSort
            sortConfig={sortConfig}  // เปิดใช้ sortConfig
        >
            {/* 5. เปลี่ยนจาก filteredRows เป็น sortedRows */}
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

export default ContactTable;