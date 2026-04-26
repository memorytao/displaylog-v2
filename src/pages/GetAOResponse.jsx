import { useMemo } from "react";

const TARGET_KEYS = ["AGW01", "AGW02", "AGW03", "AGW04"];

const GetAOResponse = ({ data, isLoading }) => {

    const rawRows = useMemo(() => {
        const responseArray = data?.response || [];

        return responseArray.flatMap(item =>
            TARGET_KEYS.flatMap(key => {
                const raw = item[key];
                if (!raw) return [];

                return raw
                    .split("\n")
                    .filter(r => r.trim() !== "")
                    .map(r => {
                        const idx = r.indexOf(":");
                        if (idx === -1) return null;

                        const fileName = r.slice(0, idx);
                        const jsonStr = r.slice(idx + 1);

                        try {
                            const parsed = JSON.stringify(jsonStr);

                            return {
                                AGW: key,
                                fileName,
                                response: parsed.replace(/\\n/g, "\n").replace(/\\"/g, '"')
                            };
                        } catch (e) {
                            return {
                                AGW: key,
                                fileName,
                                error: "Invalid JSON" + e,
                                raw: jsonStr
                            };
                        }
                    })
                    .filter(Boolean);
            })
        );
    }, [data]);

    return (
        <>
            {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <textarea
                    className="w-full h-[50vh] bg-[#262833] text-gray-300 p-4 rounded-lg font-mono text-md overflow-auto"
                    value={rawRows.map(row => `--- ${row.AGW} | ${row.fileName} ---\n${JSON.stringify(row.response).replaceAll(/\\"/g, '"').replaceAll(/""/g, "").replace(/,$/g, "") || row.error || row.raw}\n\n`).join("")}
                    readOnly
                />
            )}
        </>
    );
};

export default GetAOResponse;