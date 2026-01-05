import { CONTACT_FIELD } from "../constants/fields";

const ContactTable = ({ data }) => {

    const contactFields = CONTACT_FIELD.split("|");
    const targetKeys = ["AGW01", "AGW02", "AGW03", "AGW04"];

    const responseArray = data?.response || [];

    const rows = responseArray.flatMap((item) => {
        return targetKeys.flatMap((key) => {
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

                    // concat key (Server) to the end of the row
                    return [fileName, ...otherFields, key];
                });
        });
    });

    const handleCopyRow = (rowData) => {

        // convert array to string with | separator
        const textToCopy = rowData.join("|");

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Content Copied:");
            })
            .catch(err => console.error("Copy failed", err));
    };

    const handleCopyHeader = (headerData) => {

        // convert array to string with | separator
        const textToCopy = headerData.join("|");

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Header Copied:");
            })
            .catch(err => console.error("Copy failed", err));
    };

    return (
        <>
            <div className="overflow-scroll max-h-[60vh] border-b-4 border-slate-700 rounded-md bg-[#282C34]
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar-track]:bg-slate-800
    [&::-webkit-scrollbar-thumb]:bg-slate-500
      [&::-webkit-scrollbar-thumb]:rounded-lg">
                <table className="table-auto border-collapse w-full text-left text-white rounded-md border border-slate-100 overflow-hidden scroll-auto">
                    <thead className="font-mono text-md divide-slate-100">
                        <tr className=" cursor-pointer" title="Click to copy header" onClick={() => handleCopyHeader(contactFields)}>
                            {contactFields.map((field, idx) => (
                                <th key={idx} className="px-2 py-4 w-1/12 border-b-6 border-slate-700/60 whitespace-nowrap pl-7 pr-7">
                                    {field}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-700 text-sm">
                        {rows.map((row, rowIndex) =>
                        (
                            <tr
                                key={rowIndex}
                                onClick={() => handleCopyRow(row)}
                                className="divide-x divide-slate-700 hover:bg-slate-700/50 active:bg-slate-600 transition-colors cursor-pointer duration-150"
                                title="Click to copy"
                            >
                                {row.map((cell, cellIndex) =>
                                (
                                    <td key={cellIndex} className="px-4 py-2 whitespace-nowrap pl-7 pr-7 pt-3 pb-3" >
                                        {cellIndex === 4 ? ( // CUSTOMER_IDENTIFIER column
                                            <span className="font-mono font- bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent">{cell}</span>
                                        ) :
                                            cellIndex === 10 ? ( // REQUESTER_APPLICATION column
                                                <span className={`font-mono ${String(cell).includes("DTAC") ? "text-cyan-400 font-semibold" : ""}`}>
                                                    {cell}
                                                </span>
                                            ) :
                                                cellIndex === 23 ? ( //  MESSAGE_TO_CUSTOMER column
                                                    <span className={`font-mono font-thin min-w-[300px] max-w-[500px] whitespace-normal break-words leading-relaxed text-yellow-300`}>{cell}</span>
                                                ) :
                                                    cellIndex === 27 ? ( // STATUS column
                                                        <span className={`font-mono font-semibold ${cell === "FULS" || String(cell).toUpperCase() === "SUCCESS" ? "text-green-400" : "text-red-400"}`}>{cell}</span>
                                                    ) :
                                                        (
                                                            <span className="font-mono">{cell}</span>
                                                        )
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={contactFields.length} className="px-4 py-8 text-center text-slate-300 font-mono text-2xl justify-center">
                                    No data available 🥹
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