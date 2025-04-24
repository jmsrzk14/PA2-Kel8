import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AlertTriangleIcon, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const navigate = useNavigate();

    // State untuk form edit di modal
    const [editForm, setEditForm] = useState({
        first_name: '',
        nisn: '',
        asal_sekolah: '',
        kelompok_ujian: '',
        telp1: '',
        pilihan1_utbk: '',
        pilihan2_utbk: '',
        pilihan1_utbk_aktual: '',
        pilihan2_utbk_aktual: '',
    });

    // Fetch data profil saat komponen dimount
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
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`http://localhost:8000/student/profile`, {
                    withCredentials: true,
                });

                const data = response.data;
                setIdStudent(data.id);
                setUsername(data.username);
                setNama(data.first_name || '');
                setNisn(data.nisn || '');
                setAsalSekolah(data.asal_sekolah || '');
                setKelompokUjian(data.kelompok_ujian || '');
                setTelp(data.telp1 || '');
                setPilihan1Utbk(data.pilihan1_utbk || '');
                setPilihan2Utbk(data.pilihan2_utbk || '');
                setPilihan1UtbkAktual(data.pilihan1_utbk_aktual || '');
                setPilihan2UtbkAktual(data.pilihan2_utbk_aktual || '');

                // Inisialisasi form edit dengan data dari API
                setEditForm({
                    first_name: data.first_name || '',
                    nisn: data.nisn || '',
                    asal_sekolah: data.asal_sekolah || '',
                    kelompok_ujian: data.kelompok_ujian || '',
                    telp1: data.telp1 || '',
                    pilihan1_utbk: data.pilihan1_utbk || '',
                    pilihan2_utbk: data.pilihan2_utbk || '',
                    pilihan1_utbk_aktual: data.pilihan1_utbk_aktual || '',
                    pilihan2_utbk_aktual: data.pilihan2_utbk_aktual || '',
                });
            } catch (error: any) {
                console.error("Error fetching data:", error);
                setError('Gagal memuat data. Silakan coba lagi.');
                if (error.response?.status === 401) {
                    navigate('/loginsiswa'); // Redirect ke login jika unauthorized
                }
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [navigate]);

    // Handler untuk menyimpan perubahan dari modal edit
    const handleSaveEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('first_name', editForm.first_name);
            formData.append('nisn', editForm.nisn);
            formData.append('asal_sekolah', editForm.asal_sekolah);
            formData.append('kelompok_ujian', editForm.kelompok_ujian);
            formData.append('telp1', editForm.telp1);
            formData.append('pilihan1_utbk', editForm.pilihan1_utbk);
            formData.append('pilihan2_utbk', editForm.pilihan2_utbk);
            formData.append('pilihan1_utbk_aktual', editForm.pilihan1_utbk_aktual);
            formData.append('pilihan2_utbk_aktual', editForm.pilihan2_utbk_aktual);

            const response = await axios.put(`http://localhost:8000/student/update/${username}`, formData, {
                withCredentials: true,
            });

            // Update state lokal dengan data baru
            setNama(editForm.first_name);
            setNisn(editForm.nisn);
            setAsalSekolah(editForm.asal_sekolah);
            setKelompokUjian(editForm.kelompok_ujian);
            setTelp(editForm.telp1);
            setPilihan1Utbk(editForm.pilihan1_utbk);
            setPilihan2Utbk(editForm.pilihan2_utbk);
            setPilihan1UtbkAktual(editForm.pilihan1_utbk_aktual);
            setPilihan2UtbkAktual(editForm.pilihan2_utbk_aktual);

            setOpenModalEdit(false);
            setError('');
            alert('Profil berhasil diperbarui!');
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setError('Gagal memperbarui profil. Silakan coba lagi.');
        }
    };

    // Handler untuk menghapus profil
    const handleDeleteProfile = async () => {
        try {
            await axios.delete(`http://localhost:8000/student/delete/${idStudent}`, {
                withCredentials: true,
            });
            setDeleteModalOpen(false);
            alert('Profil berhasil dihapus!');
            navigate('/loginsiswa'); // Redirect ke halaman login setelah hapus
        } catch (error: any) {
            console.error("Error deleting profile:", error);
            setError('Gagal menghapus profil. Silakan coba lagi.');
        }
    };

    // Handler untuk mengubah nilai form edit
    const handleEditFormChange = (field: string, value: string) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                {loading && <p className="text-center">Memuat data...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
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
                            
                    <div className="flex justify-end space-x-3 p-4">
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg hover:shadow-blue-500 transition-all duration-300"
                            onClick={() => setOpenModalEdit(true)}
                        >
                            Edit Profile
                        </button>
                        <button
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-300"
                            onClick={() => setDeleteModalOpen(true)}
                        >
                            Delete Profile
                        </button>
                    </div>
                </div>

                {/* Modal Edit */}
                <Modal
                    isOpen={openModal}
                    onRequestClose={() => setOpenModalEdit(false)}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
                        <button
                            onClick={() => setOpenModalEdit(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-800"
                        >
                            <X size={25} />
                        </button>
                        <h2 className="text-lg text-center font-bold mb-4">Edit Profil Anda</h2>
                        <div className="bg-green-500 text-white text-center py-2 rounded-t-lg font-bold text-lg">
                            PROFIL SISWA
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="block font-medium" htmlFor="first_name">Nama Lengkap</label>
                                <input
                                    id="first_name"
                                    type="text"
                                    value={editForm.first_name}
                                    onChange={(e) => handleEditFormChange('first_name', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="nisn">NISN</label>
                                <input
                                    id="nisn"
                                    type="text"
                                    value={editForm.nisn}
                                    onChange={(e) => handleEditFormChange('nisn', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="asal_sekolah">Asal Sekolah</label>
                                <input
                                    id="asal_sekolah"
                                    type="text"
                                    value={editForm.asal_sekolah}
                                    onChange={(e) => handleEditFormChange('asal_sekolah', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="kelompok_ujian">Kelompok Ujian</label>
                                <input
                                    id="kelompok_ujian"
                                    type="text"
                                    value={editForm.kelompok_ujian}
                                    onChange={(e) => handleEditFormChange('kelompok_ujian', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="telp1">Telepon</label>
                                <input
                                    id="telp1"
                                    type="text"
                                    value={editForm.telp1}
                                    onChange={(e) => handleEditFormChange('telp1', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                        </form>
                        <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg font-bold text-lg mt-4">
                            PILIHAN KAMPUS DAN JURUSAN
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="block font-medium" htmlFor="pilihan1_utbk">Pilihan 1 UTBK</label>
                                <input
                                    id="pilihan1_utbk"
                                    type="text"
                                    value={editForm.pilihan1_utbk}
                                    onChange={(e) => handleEditFormChange('pilihan1_utbk', e.target.value)}
                                className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="pilihan2_utbk">Pilihan 2 UTBK</label>
                                <input
                                    id="pilihan2_utbk"
                                    type="text"
                                    value={editForm.pilihan2_utbk}
                                    onChange={(e) => handleEditFormChange('pilihan2_utbk', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="pilihan1_utbk_aktual">Pilihan 1 UTBK Aktual</label>
                                <input
                                    id="pilihan1_utbk_aktual"
                                    type="text"
                                    value={editForm.pilihan1_utbk_aktual}
                                    onChange={(e) => handleEditFormChange('pilihan1_utbk_aktual', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="pilihan2_utbk_aktual">Pilihan 2 UTBK Aktual</label>
                                <input
                                    id="pilihan2_utbk_aktual"
                                    type="text"
                                    value={editForm.pilihan2_utbk_aktual}
                                    onChange={(e) => handleEditFormChange('pilihan2_utbk_aktual', e.target.value)}
                                    className="w-full p-2 border rounded-md hover:border-blue-500 transition-all duration-300"
                                />
                            </div>
                        </form>
                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                onClick={() => setOpenModalEdit(false)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg hover:shadow-blue-500 transition-all duration-300"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Modal Hapus */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={() => setDeleteModalOpen(false)}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-800"
                        >
                            <X size={25} />
                        </button>
                        <AlertTriangleIcon className="mx-auto mb-4 h-14 w-14 text-red-500" />
                        <h2 className="mb-5 text-lg font-normal text-center">
                            Apakah Anda Yakin Untuk Hapus Permanen Profil Ini?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteProfile}
                                className="px-3 py-1 bg-gray-200 hover:text-white rounded hover:bg-blue-600 shadow-lg hover:shadow-blue-500 transition-all duration-300"
                            >
                                Ya, Saya yakin
                            </button>
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-red-600 shadow-lg hover:shadow-red-500 transition-all duration-300"
                            >
                                Tidak, Kembali
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
        </div>
        )}

export default Profil;