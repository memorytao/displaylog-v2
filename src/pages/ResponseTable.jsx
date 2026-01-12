import { useMemo } from "react";
import TableLayout from "../components/common/TableLayout";
import { RESPONSE_FIELD } from "../constants/fields";
import { copyToClipboard } from "../utils/clipboard";

const RESPONSE_FIELDS = RESPONSE_FIELD.split("|");
const TARGET_KEYS = ["AGW01", "AGW02", "AGW03", "AGW04"];

const ResponseTable = ({ data, isLoading }) => {

  const rows = useMemo(() => {
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
    <TableLayout headers={RESPONSE_FIELDS} isLoading={isLoading} isEmpty={rows.length === 0}>
      {rows.map((row, rIdx) => (
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