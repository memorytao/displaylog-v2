import { useMemo } from "react";
import TableLayout from "../components/common/TableLayout";
import { TOL_RESPONSE_FIELD } from "../constants/fields";
import { copyToClipboard } from "../utils/clipboard";

const RESPONSE_FIELDS = TOL_RESPONSE_FIELD.split("|");
const TARGET_KEYS = ["AGW01", "AGW02", "AGW03", "AGW04"];

const TOLResponseTable = ({ data, isLoading, filterText }) => {

  //  tranform data from server
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

  // 2. Filtering
  const filteredRows = useMemo(() => {
    if (!filterText || filterText.trim() === "") return rawRows;
    const lowerFilter = filterText.toLowerCase();
    return rawRows.filter((row) =>
      row.some((cell) => String(cell).toLowerCase().includes(lowerFilter))
    );
  }, [rawRows, filterText]);


  const handleCopyRow = (row) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    copyToClipboard(row.join("|"));
  };

  const renderCell = (cell, index) => {
    const strCell = String(cell);
    if (index === 4) return <span className="font-mono text-lg font-normal bg-gradient-to-r from-teal-400 to-yellow-300 bg-clip-text text-transparent">{cell}</span>;
    if (index === 8) return <span className={`font-mono text-lg ${strCell.includes("TRUE") ? "text-red-500" : ""} `}>{cell}</span>;
    if (index === 16) return <span className={`font-mono text-lg min-w-[300px] max-w-[500px] whitespace-normal break-words leading-relaxed ${cell.length > 0 && strCell.toUpperCase() !== 'SUCCESS' ? "text-red-500" : ""}`}>{cell}</span>;
    if (index === 19 || index === 20 || index === 21) return <span className="font-mono text-lg font-normal">{strCell.slice(0, 19)}</span>;
    return <span className="font-mono text-lg">{cell}</span>;
  };

  return (
    <TableLayout
      headers={RESPONSE_FIELDS}
      isLoading={isLoading}
      isEmpty={filteredRows.length === 0}
    // onSort={requestSort}
    // sortConfig={sortConfig}
    >
      {filteredRows.map((row, rIdx) => (
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

export default TOLResponseTable;