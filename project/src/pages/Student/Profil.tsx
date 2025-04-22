import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { AlertTriangleIcon, X } from "lucide-react";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

// interface Choice {
//     id: number;
//     universitas: string;
// }

Modal.setAppElement("#root");
export function Profil() {
    const [openModal, setOpenModalEdit] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idStudent, setIdStudent] = useState('');
    const [username, setUsername] = useState('');
    const [nisn, setNisn] = useState('');
    const [nama, setNama] = useState('');
    const [asalSekolah, setAsalSekolah] = useState('');
    const [kelompokUjian, setKelompokUjian] = useState('');
    const [telp, setTelp] = useState('');
    const [pilihan1Utbk, setPilihan1Utbk] = useState('');
    const [pilihan2Utbk, setPilihan2Utbk] = useState('');
    const [pilihan1UtbkAktual, setPilihan1UtbkAktual] = useState('');
    const [pilihan2UtbkAktual, setPilihan2UtbkAktual] = useState('');
    const [asalSekolahNama, setAsalSekolahNama] = useState('');
    const [namapilihan1Utbk, setNamaPilihan1Utbk] = useState('');
    const [namapilihan2Utbk, setNamaPilihan2Utbk] = useState('');
    const [namapilihan1UtbkAktual, setNamaPilihan1UtbkAktual] = useState('');
    const [namapilihan2UtbkAktual, setNamaPilihan2UtbkAktual] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
          setLoading(true);
          setError('');
          try {
            const response = await axios.get(`http://localhost:8000/student/profile`, {
              withCredentials: true,
            });
      
            const data = response.data;
      
            setIdStudent(data.id);
            setNama(data.first_name);
            setUsername(data.username);
            setNisn(data.nisn);
            setAsalSekolah(data.asal_sekolah);
            setKelompokUjian(data.kelompok_ujian);
            setTelp(data.telp1);
            setPilihan1Utbk(data.pilihan1_utbk);
            setPilihan2Utbk(data.pilihan2_utbk);
            setPilihan1UtbkAktual(data.pilihan1_utbk_aktual);
            setPilihan2UtbkAktual(data.pilihan2_utbk_aktual);
            

            const sekolahRes = await axios.get(`http://localhost:8000/admin/viewSekolah/${data.asal_sekolah}`);
            setAsalSekolahNama(sekolahRes.data.sekolah);
            const prodi1Res = await axios.get(`http://localhost:8000/admin/viewMajor/${data.pilihan1_utbk}`);
            setNamaPilihan1Utbk(prodi1Res.data.nama_prodi_ptn);
            const prodi2Res = await axios.get(`http://localhost:8000/admin/viewMajor/${data.pilihan2_utbk}`);
            setNamaPilihan2Utbk(prodi2Res.data.nama_prodi_ptn);
            const prodi1AktualRes = await axios.get(`http://localhost:8000/admin/viewMajor/${data.pilihan1_utbk_aktual}`);
            setNamaPilihan1UtbkAktual(prodi1AktualRes.data.nama_prodi_ptn);
            const prodi2AktualRes = await axios.get(`http://localhost:8000/admin/viewMajor/${data.pilihan2_utbk_aktual}`);
            setNamaPilihan2UtbkAktual(prodi2AktualRes.data.nama_prodi_ptn);
          } catch (error) {
            console.error("Error fetching data:", error);
            setError('Gagal memuat data. Silakan coba lagi.');
          } finally {
            setLoading(false);
          }
        };
        fetchStudent();
      }, []);

//     // State untuk profil pengguna
//     const [profil, setProfil] = useState(() =>{
//         const savedProfil = localStorage.getItem("profil");
//         return savedProfil ? JSON.parse(savedProfil) : {
//             nama: "",
//             nisn: "",
//             asalSekolah: "",
//             provinsi: "",
//         };
//     });
    
//     // Ambil data pilihan kampus dari localStorage
//     const [choices, setChoices] = useState<Choice[]>(() => {
//         const savedChoices = localStorage.getItem("choices");
//         return savedChoices ? JSON.parse(savedChoices) : [{ id: 1, universitas: "" }];
//     });

//     // Simpan profil ke Local Storage setiap kali berubah
//     useEffect(() => {
//         localStorage.setItem("profil", JSON.stringify(profil));
//     }, [profil]);

//     // Simpan pilihan kampus ke Local Storage setiap kali berubah
//     useEffect(() => {
//         localStorage.setItem("choices", JSON.stringify(choices));
//     }, [choices]);

//     // const [choices, setChoices] = useState<Choice[]>([
//     //     { id: 1, universitas: "" }
//     // ]);

//     // Menambahkan pilihan baru
//     const addChoice = () => {
//         if (choices.length <= 4) {
//         setChoices([...choices, { id: choices.length + 1, universitas: "" }]);
//         }
//     };

//     // Menghapus pilihan berdasarkan id
//     const removeChoice = (id:number) => {
//         setChoices(choices.filter(choice => choice.id !== id));
//     };

//     // Mengupdate pilihan kampus saat user memilih
//     const handleChoiceChange = (id:number, value:string) => {
//         setChoices(choices.map(choice =>
//             choice.id === id ? { ...choice, universitas: value } : choice
//         ));
//     };

//     // Mengupdate data profil saat disimpan dari modal edit
//     const handleSaveEdit = () => {
//     const updatedProfile = {
//         nama: (document.getElementById("name") as HTMLInputElement).value,
//         nisn: (document.getElementById("nisn") as HTMLInputElement).value,
//         asalSekolah: (document.getElementById("school") as HTMLInputElement).value,
//         provinsi: (document.getElementById("province") as HTMLInputElement).value,
//     };
    
//     // Update state lokal
//     setProfil(updatedProfile);
    
//     // Simpan ke localStorage
//     localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
//     localStorage.setItem('userChoices', JSON.stringify(choices));
    
//     setOpenModalEdit(false);
// };

//     // Fungsi untuk menghapus data profil
//     const handleDeleteProfile = () => {
//         // Hapus data dari localStorage
//         localStorage.removeItem("profil");
//         localStorage.removeItem("choices");

//         // Reset state ke nilai default
//         setProfil({
//             nama: "",
//             nisn: "",
//             asalSekolah: "",
//             provinsi: "",
//         });

//         setChoices([{ id: 1, universitas: "" }]);

//         // Tutup modal setelah penghapusan
//         setDeleteModalOpen(false);
//     };

    return (
        <div className="flex items-center justify-center bg-ray-100 p-6">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <div className="bg-green-500 text-white text-center py-2 rounded-t-lg font-bold text-lg">
                        PROFIL SISWA
                    </div>
                    <div className="p-4 space-y-2">
                        <div className="flex"><span className="w-1/4 font-semibold">Nama</span><span className="w-3/4">: {nama}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Username</span><span className="w-3/4">: {username}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">NISN</span><span className="w-3/4">: {nisn}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Asal Sekolah</span><span className="w-3/4">: {asalSekolahNama}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Kelompok Ujian</span><span className="w-3/4">: {kelompokUjian}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Telepon</span><span className="w-3/4">: {telp}</span></div>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg font-bold text-lg">
                        PILIHAN KAMPUS DAN JURUSAN
                    </div>
                    <div className="p-4 space-y-2 w-100">
                        <div className="flex"><span className="w-1/4 font-semibold">Pilihan 1 UTBK</span><span className="w-4/4">: {namapilihan1Utbk}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Pilihan 2 UTBK</span><span className="w-4/4">: {namapilihan2Utbk}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Pilihan 1 UTBK Aktual</span><span className="w-4/4">: {namapilihan1UtbkAktual}</span></div>
                        <div className="flex"><span className="w-1/4 font-semibold">Pilihan 2 UTBK Aktual</span><span className="w-4/4">: {namapilihan2UtbkAktual}</span></div>                          
                            
                    </div>
                    <div className="flex justify-end space-x-3 p-4">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg hover:shadow-blue-500 transition-all duration-300" onClick={() => setOpenModalEdit(true)}>Edit Profile</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-300" onClick={() => setDeleteModalOpen(true)}>Delete Profile</button>
                    </div>
                </div>

                {/* <Modal isOpen={openModal} onRequestClose={() => setOpenModalEdit(false)}
                    className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 w-[500px] max-w-full shadow-lg border hover:border-blue-500 transition-all duration-300 rounded-lg relative">
                        <button onClick={() => setOpenModalEdit(false)} className="absolute top-2 right-2 text-gray-600 hover:text-red-800">
                            <X size={25} />
                        </button>
                        <h2 className="text-lg text-center font-bold mb-4">Edit Profil Anda</h2>
                        <div className="bg-green-500 text-white text-center py-2 rounded-t-lg font-bold text-lg">
                            PROFIL SISWA
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="block font-medium" htmlFor="name">Nama Lengkap </label>
                                <input id="name" type="text" placeholder="Nama" defaultValue={profil.nama} className="w-full p-2 shadow-lg shadow-lg shadow hover:shadow-blue-500 transition-all duration-300 border hover:border-blue-500 transition-all duration-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="nisn">NISN</label>
                                <input id="nisn" type="text" placeholder="NISN" defaultValue={profil.nisn} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="school">Asal Sekolah</label>
                                <input id="school" type="text" placeholder="Asal Sekolah" defaultValue={profil.asalSekolah} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="province">Provinsi</label>
                                <input id="province" type="text" placeholder="Provinsi" defaultValue={profil.provinsi} className="w-full p-2 border rounded-md" />
                            </div>
                            <br />
                        </form>
                        <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg font-bold text-lg">
                            PILIHAN KAMPUS DAN JURUSAN
                        </div>
                        <form>
                            {choices.map((choice, index) => (
                                <div key={choice.id} className="mb-4">
                                    <label className="block font-medium">Pilihan {index + 1}</label>
                                    <select className="w-full p-2 border rounded-md" value={choice.universitas} onChange={(e) => handleChoiceChange(choice.id, e.target.value)}>
                                        <option value="">Pilih Kampus & Jurusan</option>
                                        <option value="UI - Teknik Informatika">UI - Teknik Informatika</option>
                                        <option value="ITB - Sistem Informasi">ITB - Sistem Informasi</option>
                                        <option value="UI - Sistem Informasi">UI - Sistem Informasi</option>
                                        <option value="ITB - Teknik Informatika">ITB - Teknik Informatika</option>
                                    </select>
                                    {choices.length > 1 && (
                                        <button onClick={() => removeChoice(choice.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-300">-</button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addChoice} disabled={choices.length >= 4} className={`px-3 py-1 rounded shadow-lg transition-all duration-300
        ${choices.length >= 4 ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 hover:shadow-green-500"}`}>Tambah Pilihan +</button>
                        </form>
                        <div className="flex justify-end space-x-3 mt-4">
                            <button onClick={() => setOpenModalEdit(false)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-300">Close</button>
                            <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg hover:shadow-blue-500 transition-all duration-300">Save</button>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={isDeleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}
                    className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 w-120 max-w-full border rounded-lg shadow-lg relative">
                        <button onClick={() => setDeleteModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-red-800">
                            <X size={25} />
                        </button>
                        <AlertTriangleIcon className="mx-auto mb-4 h-14 w-14 dark:text-200" />
                        <h2 className="mb-5 text-lg font-normal dark:text-400">
                            Apakah Anda Yakin Untuk Hapus Permanen Profil Ini?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleDeleteProfile} className="px-3 py-1 bg-gray-200 rounded hover:text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500 transition-all duration-200">Ya, Saya yakin</button>
                            <button onClick={() => setDeleteModalOpen(false)} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-200">Tidak, Kembali</button>
                        </div>
                    </div>

                </Modal> */}
            </div>
        </div>
    );
};

export default Profil;