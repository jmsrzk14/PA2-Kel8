import React from "react";
import { useNavigate } from "react-router-dom";

const Tryout: React.FC = () => {
    const  navigate = useNavigate();

    const data = [
        {id: 1, jumlahTryout: "Tryout 1", tanggal: "2022-01-01", rataRataTryout: 80},
        {id: 2, jumlahTryout: "Tryout 2", tanggal: "2022-01-01", rataRataTryout: 80},
    ]
    return(
        <div className="mx-auto p-6 rounded">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
                TRYOUT SISWA
            </h2>
            <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">NO.</th>
                            <th className="border border-gray-300 px-4 py-2">Jumlah Tryout</th>
                            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                            <th className="border border-gray-300 px-4 py-2">Rata-Rata Tryout</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.jumlahTryout}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.tanggal}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.rataRataTryout}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => navigate(`/homeuser/tryout/detailtryout/${item.id}`, { state: { tanggal: item.tanggal } })}>
                                    Detail
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tryout;