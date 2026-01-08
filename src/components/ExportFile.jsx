import { FiDownload } from "react-icons/fi";

const ExportFile = ({ data }) => {

    const handleExport = () => {

        const listOfdata = data?.response || [];

        if (listOfdata.length === 0) {
            alert("No data to export");
            return;
        }

        const allRows = [];
        listOfdata.forEach(item => {
            // Find host and content
            const host = Object.keys(item)[0];
            const content = item[host];

            if (!content) {
                console.log('Content Null');
                return;
            }


            if (content) {

                console.log('Can export', sessionStorage.setItem('canExport', true));

                sessionStorage.setItem('canExport', true);
                const lines = content.split("\n").filter(row => row.trim() !== "");

                lines.forEach(line => {
                    const parts = line.split(":");
                    const fileName = parts[0];
                    const otherData = parts.slice(1).join(":");
                    const otherFields = otherData.split("|");
                    const rowData = [fileName, ...otherFields, host];
                    allRows.push(rowData);
                });
            }
        });

        const csvRows = allRows.map(row =>
            row.map(field => `${field}`).join("|")
        );

        const csvString = csvRows.join("\n");

        // \uFEFF can read Excel UTF-8 correctly
        const blob = new Blob(["\uFEFF" + csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `export_data_${new Date().getTime()}.csv`);
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            className=" transition delay-100 duration-200 ease-in-out rounded-lg bg-rose-700 hover:bg-rose-400 text-white font-bold py-2 px-6 shadow-lg flex items-center gap-2 hover:cursor-pointer mb-2"
        >
            <FiDownload className="w-4 h-4" />
            Export CSV
        </button>
    )
}

export default ExportFile;