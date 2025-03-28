import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LihatSiswa = () => {
  const { username } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nisn, setNisn] = useState(0);
  const [active, setActive] = useState(0);
  const [kelompokUjian, setKelompokUjian] = useState('');
  const [noUtbk, setNoUtbk] = useState(0);
  const [namaSekolah, setNamaSekolah] = useState('');
  const [pilihan1Utbk, setPilihan1Utbk] = useState('');
  const [pilihan2Utbk, setPilihan2Utbk] = useState('');
  const [pilihan1UtbkAktual, setPilihan1UtbkAktual] = useState('');
  const [pilihan2UtbkAktual, setPilihan2UtbkAktual] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaket = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://127.0.0.1:8000/students/view/${username}`);
        if (!response.ok) throw new Error('Gagal mengambil data siswa');
        const data = await response.json();
        console.log("Data dari API:", data);

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setNisn(data.nisn);
        setActive(data.active);
        setKelompokUjian(data.kelompok_ujian);
        setNoUtbk(data.noUtbk);
        setNamaSekolah(data.nama_sekolah);
        setPilihan1Utbk(data.pilihan1_utbk);
        setPilihan2Utbk(data.pilihan2_utbk);
        setPilihan1UtbkAktual(data.pilihan1_utbk_aktual);
        setPilihan2UtbkAktual(data.pilihan2_utbk_aktual);
      } catch (err_or) {
        console.error("Error fetching paket:", error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPaket();
    }
  }, [username]);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Detail Data Siswa</h1>
      <div className="bg-gray-100 p-4 rounded-md space-y-4">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Nama Siswa:</strong> {firstName} {lastName}</p>
        <p><strong>NISN:</strong> {nisn || "-"}</p>
        <p><strong>Aktif:</strong> {active || "-"}</p>
        <p><strong>No UTBK:</strong> {noUtbk || "-"}</p>
        <p><strong>Asal Sekolah:</strong> {namaSekolah || "-"}</p>
        <p><strong>Kelompok Ujian:</strong> {kelompokUjian}</p>
        <p><strong>Pilihan 1 UTBK:</strong> {pilihan1Utbk || "-"}</p>
        <p><strong>Pilihan 2 UTBK:</strong> {pilihan2Utbk || "-"}</p>
        <p><strong>Pilihan 1 UTBK Aktual:</strong> {pilihan1UtbkAktual || "-"}</p>
        <p><strong>Pilihan 2 UTBK Aktual:</strong> {pilihan2UtbkAktual || "-"}</p>
        {/* <p><strong>Harga:</strong> Rp {price.toLocaleString('id-ID')}</p> */}
      </div>
    </div>
  );
};

export default LihatSiswa;
