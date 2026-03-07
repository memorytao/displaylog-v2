import { useState } from 'react';

// 1. Mock Data: ข้อมูลตัวอย่าง
const initialUsers = [
    { id: 1, name: 'Somchai Jaidee', email: 'somchai@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Somsri Rakrian', email: 'somsri@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Viewer', status: 'Active' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Bob Johnson', email: 'bob@test.com', role: 'Editor', status: 'Inactive' },
];

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Filter Logic: กรองข้อมูลตาม Search Term
    const filteredUsers = initialUsers.filter((user) => {
        const term = searchTerm.toLowerCase();
        console.log( 'filter', user);
        
        return (
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term)
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 p-10 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">

                {/* Header & Search Bar */}
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">รายชื่อผู้ใช้งาน</h2>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ, อีเมล, หรือตำแหน่ง..."
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* Search Icon (SVG) */}
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-gray-600 font-semibold">ID</th>
                                <th scope="col" className="px-6 py-4 text-gray-600 font-semibold">ชื่อ-นามสกุล</th>
                                <th scope="col" className="px-6 py-4 text-gray-600 font-semibold">อีเมล</th>
                                <th scope="col" className="px-6 py-4 text-gray-600 font-semibold">ตำแหน่ง</th>
                                <th scope="col" className="px-6 py-4 text-gray-600 font-semibold">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="px-6 py-4 text-gray-500">#{user.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'Editor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold
                        ${user.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        ไม่พบข้อมูลที่ค้นหา
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer (Optional) */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 text-right text-xs text-gray-500">
                    แสดงผล {filteredUsers.length} รายการ
                </div>

            </div>
        </div>
    );
}

export default App;