import React, { useEffect, useState } from "react";

interface Choice {
    id: number;
    universitas: string;
}

const HasilTryout = () => {
    const [profil, setProfil] = useState({
        nama: "",
        nisn: "",
        asalSekolah: "",
        provinsi: ""
    });
    const [choices, setChoices] = useState<Choice[]>([]);

    useEffect(() => {
        // Ambil data dari localStorage saat komponen dimuat
        const savedProfile = localStorage.getItem('profil');
        const savedChoices = localStorage.getItem('choices');

        if (savedProfile) {
            setProfil(JSON.parse(savedProfile));
        }

        if (savedChoices) {
            setChoices(JSON.parse(savedChoices));
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Bagian Header */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-600 text-white py-2 rounded-md font-bold">
                    Siswa Pendaftar Saat Ini
                </div>
                <div className="bg-blue-800 text-white py-2 rounded-md font-bold">
                    Jumlah Sekolah Pendaftar
                </div>
            </div>
            <hr className="border-t border-gray-300 py-2 mt-5" />

            {/* Profil Siswa */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-left">{profil.nama || "Belum ada data"}</p>
                    <p className="font-bold text-center flex-1">{profil.asalSekolah || "Belum ada data"}</p>
                    <p className="font-bold text-right">{profil.nisn || "Belum ada data"}</p>
                </div>
                <hr className="border-t border-gray-300 mt-4" />
            </div>


            {/* Pilihan Kampus */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-600 text-white py-2 rounded-md font-bold">
                    {choices[0]?.universitas || "Belum ada pilihan"} - Daya Tampung: 
                </div>
                <div className="bg-blue-800 text-white py-2 rounded-md font-bold">
                    {choices[1]?.universitas || "Belum ada pilihan"} - Daya Tampung: 
                </div>
                <div className="bg-green-600 text-white py-2 rounded-md font-bold">
                    {choices[2]?.universitas || "Belum ada pilihan"} - Daya Tampung: 
                </div>
                <div className="bg-blue-800 text-white py-2 rounded-md font-bold">
                    {choices[3]?.universitas || "Belum ada pilihan"} - Daya Tampung: 
                </div>
            </div>

            {/* Peringkat */}
            <div className="grid grid-cols-2 text-sm text-center mt-4">
                <div>
                <hr className="border-t py-2 border-gray-300 mt-5" />
                    <p className="text-red-600">Peringkat  dari  Pendaftar Pilihan 1</p>
                    <p className="text-red-600">Peringkat  dari  Total Pendaftar</p>
                    <hr className="border-t border-gray-300 mt-5" />
                </div>
                <div>
                <hr className="border-t py-2 border-gray-300 mt-5" />
                    <p className="text-red-600">Peringkat  dari  Pendaftar Pilihan 2</p>
                    <p className="text-red-600">Peringkat  dari Total Pendaftar</p>
                    <hr className="border-t border-gray-300 mt-5" />
                </div>
            </div>

            {/* Tabel Nilai */}
            <div className="mt-6">
                <table className="w-full border-collapse border border-gray-300 text-center text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">NO</th>
                            <th className="border p-2">Tanggal</th>
                            <th className="border p-2">PPU</th>
                            <th className="border p-2">PU</th>
                            <th className="border p-2">PM</th>
                            <th className="border p-2">PK</th>
                            <th className="border p-2">LBI</th>
                            <th className="border p-2">LBE</th>
                            <th className="border p-2">PMB</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">NILAI</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td className="border p-2">1</td>
                                <td className="border p-2">Tanggal</td>
                                <td className="border p-2">Nilai PPU</td>
                                <td className="border p-2">Nilai PU</td>
                                <td className="border p-2">Nilai PM</td>
                                <td className="border p-2">Nilai PK</td>
                                <td className="border p-2">Nilai LBI</td>
                                <td className="border p-2">Nilai LBE</td>
                                <td className="border p-2">Nilai PMB</td>
                                <td className="border p-2">Nilai Total</td>
                                <td className="border p-2">NILAI</td>
                            </tr>
                        <tr className="font-bold bg-gray-100 text-center">
                            <td className="border border-gray-300 px-4 py-2" colSpan={10}>Nilai Rata-rata</td>
                            <td className="border border-gray-300 px-4 py-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Chart */}
            {/* <div className="mt-6">
                <h3 className="text-center font-bold">CHART TITLE</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="nilai" fill="#3182CE" />
                        <Bar dataKey="totalBenar" fill="#38A169" />
                    </BarChart>
                </ResponsiveContainer>
            </div> */}

            {/* Footer */}
            <p className="text-center text-gray-500 text-xs mt-6">©2023 KAWAL PTN-KU</p>
        </div>
    );
};

export default HasilTryout;