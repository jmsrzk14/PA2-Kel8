import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LihatProdi = () => {
  const { id_prodi } = useParams();
  const [namaProdi, setNamaProdi] = useState('');
  const [namaProdiPtn, setNamaProdiPtn] = useState('');
  const [active, setActive] = useState('');
  const [jenis, setJenis] = useState('');
  const [jenjang, setJenjang] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProdi = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/viewMajor/${id_prodi}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);

        setNamaProdi(data.nama_prodi);
        setNamaProdiPtn(data.nama_prodi_ptn);
        setActive(data.active);
        setJenis(data.jenis);
        setJenjang(data.jenjang);
      } catch (error) {
        console.error("Error fetching paket:", error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (id_prodi) {
      fetchProdi();
    }
  }, [id_prodi]);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Detail Data Prodi</h1>
      <div className="bg-gray-100 p-4 rounded-md space-y-4">
        <p><strong>Nama Prodi:</strong> {namaProdi}</p>
        <p><strong>Nama Prodi PTN:</strong> {namaProdiPtn}</p>
        <p><strong>Active:</strong> {active}</p>
        <p><strong>Jenis:</strong> {jenis}</p>
        <p><strong>Jenjang:</strong> {jenjang}</p>
      </div>
    </div>
  );
};

export default LihatProdi;
