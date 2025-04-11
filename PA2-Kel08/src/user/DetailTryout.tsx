import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";


const DetailTryout = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const tanggal = location.state?.tanggal || "Tanggal tidak tersedia";

    const data = [
        { id: 1, jenis: "PPU", nilai: "90" },
        { id: 2, jenis: "PM", nilai: "84" },
    ];

    const totalNilai = data.reduce((acc, item) => acc + parseInt(item.nilai), 0);
    const rataRata = data.length > 0 ? (totalNilai / data.length).toFixed(2) : 0;

    return (
        <div className="mx-auto p-6 rounded">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
                Detail Tryout ke-{id}
            </h2>
            <h3 className="text-lg mb-4 text-gray-800">
                Tanggal Tryout: {tanggal}
            </h3>
            <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">NO.</th>
                            <th className="border border-gray-300 px-4 py-2">Jenis</th>
                            <th className="border border-gray-300 px-4 py-2">Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.jenis}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.nilai}</td>
                            </tr>
                        ))}
                        <tr className="font-bold bg-gray-100 text-center">
                            <td className="border border-gray-300 px-4 py-2" colSpan={2}>Rata-rata</td>
                            <td className="border border-gray-300 px-4 py-2">{rataRata}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end mt-4">
                <button
                    className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate(`/homeuser/tryout`)}
                >
                    Kembali
                </button>
                </div>
            </div>
        </div>
    );
};

export default DetailTryout;
