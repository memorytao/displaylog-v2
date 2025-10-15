import { RESPONSE_FILD } from "./fields";


let rawData = "20250207T154150_031197.RESPONSE_HISTORY.csv:34871|78820|ESV2025020715414316301423|66652146179|1151293538855480109|{ACCOUNT_TYPE=PREPAID, COMPANY_CODE=DTN}|ESV|||DTAC_APP|At home|RecentBuy|BUY_NOTIFICATION||21233452|FULF|203325|Subscriber's credit is inadequate|CCB||21233452|01/01/2001 00:00:01|||32900|02/07/2025 15:42:37|DIGITAL_PRE"
let fileName = rawData.match(/^[^:]+/);


const ResponseTable = ({ data }) => {
  const responseFields = RESPONSE_FILD.split("|");
  // const rows = data.splt("|");
  return (
    <>
      <div className="overflow-scroll border-b-4 border-slate-700 rounded-md bg-[#282C34]">
        <table className="table-auto border-collapse w-full text-left text-white rounded-md border border-slate-100 overflow-hidden scroll-auto">
          <thead className="font-mono text-sm">
            <tr className=" divide-slate-100">
              {responseFields.map((field, idx) => (
                <th key={idx} className="px-2 py-4">
                  {field}
                </th>
              ))}
            </tr>
          </thead>

          {/* <tbody className="divide-y divide-slate-100 text-base">
        <tr className="divide-slate-300">
          <td className="px-4 py-2">
            The Sliding Mr. Bones (Next Stop, Pottersville)
          </td>
          <td className="px-4 py-2">Malcolm Lockyer</td>
          <td className="px-4 py-2">1961</td>
        </tr>
        <tr className=" divide-slate-100">
          <td className="px-4 py-2">Witchy Woman</td>
          <td className="px-4 py-2">The Eagles</td>
          <td className="px-4 py-2">1972</td>
        </tr>
        <tr className=" divide-slate-100">
          <td className="px-4 py-2">Shining Star</td>
          <td className="px-4 py-2">Earth, Wind, and Fire</td>
          <td className="px-4 py-2">1975</td>
        </tr>
      </tbody> */}
        </table>
      </div>
    </>
  );
};

export default ResponseTable;
