import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditSekolah = () => {
  const { id } = useParams(); 
  const [npsn, setNpsn] = useState('');
  const [sekolahs, setSekolah] = useState('');
  const [bentuk, setBentuk] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [propinsi, setPropinsi] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/viewSekolah/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);
        
        setNpsn(data.npsn);
        setSekolah(data.sekolah);
        setBentuk(data.bentuk);
        setKecamatan(data.kecamatan);
        setKabupaten(data.kabupaten_kota);
        setPropinsi(data.propinsi);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching paket:", error);
      }
    };

    fetchSchool();
  }, [id]);

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

    console.log("Payload yang dikirim:", formData.toString());

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data Sekolah tidak akan dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#33',
      confirmButtonText: 'Ya, Edit!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/admin/editSekolah/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          });

          if (!response.ok) {
            throw new Error("Gagal mengedit Data Sekolah");
          }
  
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data Sekolah berhasil diubah.',
            icon: 'success',
            confirmButtonColor: '#33',
          }).then(() => {
            navigate('/dashboard/school/list');
          });
  
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: (error as Error).message || 'Terjadi kesalahan saat menghapus.',
            icon: 'error',
            confirmButtonColor: '#d3085d6',
          });
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Data Sekolah</h1>
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

export default EditSekolah;
