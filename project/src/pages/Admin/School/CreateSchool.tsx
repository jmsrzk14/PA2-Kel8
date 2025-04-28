import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TambahPaket = () => {
  const [npsn, setNpsn] = useState('');
  const [sekolahs, setSekolah] = useState('');
  const [bentuk, setBentuk] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [propinsi, setPropinsi] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("npsn", npsn);
    formData.append("sekolahs", sekolahs);
    formData.append("bentuk", bentuk);
    formData.append("kecamatan", kecamatan);
    formData.append("kabupaten", kabupaten);
    formData.append("propinsi", propinsi);
    formData.append("status", status);


    try {
      const response = await fetch("http://127.0.0.1:8000/admin/createSekolah", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      Swal.fire({
          title: 'Berhasil!',
          text: 'Data Sekolah berhasil ditambahkan.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate("/dashboard/school/list")
        });
      } catch (error) {
        Swal.fire({
          title: 'Gagal!',
          text: (error as Error).message || 'Terjadi kesalahan saat menambahkan.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
    };
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Sekolah</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label className="block text-sm font-medium text-gray-700">Nama Sekolah</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={sekolahs}
            onChange={(e) => setSekolah(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NPSN</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={npsn}
            onChange={(e) => setNpsn(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bentuk</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={bentuk}
            onChange={(e) => setBentuk(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kabupaten</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={kabupaten}
            onChange={(e) => setKabupaten(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Propinsi</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={propinsi}
            onChange={(e) => setPropinsi(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TambahPaket;
