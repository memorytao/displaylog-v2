import React from "react";
import { copyToClipboard } from "../../utils/clipboard";

const TableLayout = ({ headers, isLoading, isEmpty, children, onSort, sortConfig }) => {

    const handleCopyHeader = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        copyToClipboard(headers.join("|"));
    };

    return (
        <div className="overflow-auto max-h-[60vh] bg-[#282C34] rounded-md border border-slate-700
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:bg-slate-800
        [&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-thumb]:rounded-lg relative">

            <table className="table-auto border-separate border-spacing-0 w-full text-left text-white">
                <thead className="font-mono text-md">
                    <tr>
                        {headers.map((field, idx) => (
                            <th
                                key={idx}
                                onClick={() => {
                                    // handleCopyHeader();      // 1. สั่ง Copy Header (เพิ่มกลับเข้ามาให้แล้วครับ)
                                    if (onSort) onSort(idx); // 2. สั่งเรียงลำดับ (Sort)
                                }}
                                onDoubleClick={handleCopyHeader}
                                className="sticky top-0 z-20 bg-[#282C34] px-2 py-4 border-b border-slate-600 whitespace-nowrap pl-7 pr-7 shadow-sm text-slate-200 select-none hover:bg-slate-700 transition-colors cursor-pointer"
                                title="Click to sort and copy header"
                            >
                                <div className="flex items-center gap-2">
                                    {field}
                                    {/* แสดงลูกศร ▲ ▼ เฉพาะคอลัมน์ที่ถูกเลือก */}
                                    {sortConfig?.key === idx && (
                                        <span className="text-xs text-zinc-200">
                                            {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-700 text-sm">
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <tr key={`skeleton-${i}`} className="animate-pulse">
                                {headers.map((_, j) => (
                                    <td key={j} className="px-4 py-4 whitespace-nowrap pl-7 pr-7">
                                        <div className="h-5 bg-slate-600/50 rounded w-full min-w-[50px]"></div>
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : isEmpty ? (
                        <tr>
                            <td colSpan={headers.length} className="px-4 py-8 text-center text-slate-300 font-mono text-2xl">No data available</td>
                        </tr>
                    ) : (
                        children
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableLayout;