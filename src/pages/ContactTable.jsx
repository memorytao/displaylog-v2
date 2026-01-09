import { useMemo } from "react";
import { CONTACT_FIELD } from "../constants/fields";

const CONTACT_FIELDS = CONTACT_FIELD.split("|");
const TARGET_KEYS = ["AGW01", "AGW02", "AGW03", "AGW04"];

const ContactTable = ({ data, isLoading }) => {

    const rows = useMemo(() => {
        const responseArray = data?.response || [];

        return responseArray.flatMap((item) => {
            return TARGET_KEYS.flatMap((key) => {
                const content = item[key];
                if (!content) return [];

                return content
                    .split("\n")
                    .filter((row) => row.trim() !== "")
                    .map((row) => {
                        const parts = row.split(":");
                        const fileName = parts[0];
                        const otherData = parts.slice(1).join(":");
                        const otherFields = otherData.split("|");
                        return [fileName, ...otherFields, key];
                    });
            });
        });
    }, [data]);

    const copyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            console.log('Copied successfully');
        } catch (err) {
            console.error('Copied error ', err);
        }
        document.body.removeChild(textArea);
    };

    const handleCopyRow = (rowData) => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        copyToClipboard(rowData.join("|"));
    };

    const handleCopyHeader = (headerData) => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        copyToClipboard(headerData.join("|"));
    };

    const renderCell = (cell, index) => {
        const strCell = String(cell);

        // CUSTOMER_IDENTIFIER
        if (index === 4) {
            return <span className="font-mono text-lg font-normal bg-gradient-to-r from-teal-400 to-yellow-200 bg-clip-text text-transparent">{cell}</span>;
        }
        // REQUESTER_CHANNEL (9) & REQUESTER_APPLICATION (10)
        if (index === 9 || index === 10) {
            const colorClass = strCell.includes("DTAC") ? "text-cyan-400 font-semibold" : strCell.includes("TRUE") ? "text-rose-400 font-semibold" : "";
            return <span className={`font-mono text-lg ${colorClass}`}>{cell}</span>;
        }
        // MESSAGE_TO_CUSTOMER
        if (index === 23) {
            return <span className="font-mono text-lg font-thin min-w-[300px] max-w-[500px] whitespace-normal break-words leading-relaxed text-yellow-300">{cell}</span>;
        }
        // STATUS
        if (index === 27) {
            const isSuccess = cell === "FULS" || strCell.toUpperCase() === "SUCCESS";
            return <span className={`font-mono text-lg font-semibold ${isSuccess ? "text-green-400" : "text-red-400"}`}>{cell}</span>;
        }
        // OFFER_START_TIME (19) & CREATED_TIME (29)
        if (index === 19 || index === 29) {
            return <span className="font-mono text-lg font-normal">{strCell.slice(0, 19)}</span>;
        }

        // Default
        return <span className="font-mono text-lg">{cell}</span>;
    };

    return (
        <>
            <div className="overflow-auto max-h-[60vh] bg-[#282C34] rounded-md border border-slate-700
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-slate-800
            [&::-webkit-scrollbar-thumb]:bg-slate-500
            [&::-webkit-scrollbar-thumb]:rounded-lg relative">

                <table className="table-auto border-separate border-spacing-0 w-full text-left text-white">
                    <thead className="font-mono text-md">
                        <tr className="cursor-pointer" title="Click to copy header" onClick={() => handleCopyHeader(CONTACT_FIELDS)}>
                            {CONTACT_FIELDS.map((field, idx) => (
                                <th
                                    key={idx}
                                    className="sticky top-0 z-20 bg-[#282C34] px-2 py-4 border-b border-slate-600 whitespace-nowrap pl-7 pr-7 shadow-sm text-slate-200"
                                >
                                    {field}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-700 text-sm">
                        {isLoading ? (
                            // --- SKELETON LOADING STATE ---
                            [...Array(5)].map((_, i) => (
                                <tr key={`skeleton-${i}`} className="animate-pulse">
                                    {CONTACT_FIELDS.map((_, j) => (
                                        <td key={j} className="px-4 py-4 whitespace-nowrap pl-7 pr-7">
                                            <div className="h-5 bg-slate-600/50 rounded w-full min-w-[50px]"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : rows.length > 0 ? (
                            rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => handleCopyRow(row)}
                                    className="divide-x divide-slate-700 hover:bg-slate-700/50 active:bg-slate-600 transition-colors cursor-pointer duration-150"
                                    title="Click to copy"
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-4 py-2 whitespace-nowrap pl-7 pr-7 pt-3 pb-3 border-b border-slate-700/50" >
                                            {renderCell(cell, cellIndex)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={CONTACT_FIELDS.length} className="px-4 py-8 text-center text-slate-300 font-mono text-2xl justify-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ContactTable;