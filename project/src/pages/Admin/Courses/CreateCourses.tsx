import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TambahPaket = () => {
  const [namaPaket, setNamaPaket] = useState('');
  const [total, setTotal] = useState('');
  const [active, setActive] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", namaPaket);
    formData.append("total", total.toString());
    formData.append("active", active.toString());
    formData.append("price", price.toString());

    console.log("Payload yang dikirim:", formData.toString());

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/createPacket", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      Swal.fire({
          title: 'Berhasil!',
          text: 'Data Paket TryOut berhasil ditambahkan.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate("/dashboard/courses/list")
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Paket TryOut</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Paket</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={namaPaket}
            onChange={(e) => setNamaPaket(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={total}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, "");
              setTotal(rawValue);
            }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Active</label>
          <input
            type="number"
            className="mt-1 p-2 border rounded w-full"
            value={active}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, "");
              setActive(rawValue);
            }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Harga</label>
          <div className="mt-1 flex items-center border rounded w-full">
            <span className="p-2">Rp.</span>
            <input
              type="text"
              className="p-2 flex-1 outline-none"
              value={price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setPrice(rawValue);
              }}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          Simpan Paket
        </button>
      </form>
    </div>
  );
};

export default TambahPaket;
