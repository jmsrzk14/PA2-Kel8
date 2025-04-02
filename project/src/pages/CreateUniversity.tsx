import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahPtn = () => {
  const [namaPaket, setNamaPaket] = useState('');
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", namaPaket);
    formData.append("total", total.toString());
    formData.append("active", active.toString());
    formData.append("price", price.toString());

    console.log("Payload yang dikirim:", formData.toString()); // 🔍 Debugging

    try {
      const response = await fetch("http://127.0.0.1:8000/courses/createPacket", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const result = await response.json();
      console.log("Response API:", result);

      if (response.ok) {
        navigate("/dashboard/courses/list");
      } else {
        alert("Gagal menambahkan paket");
      }
    } catch (error) {
      console.error("Error saat menambahkan paket", error);
    }
  };

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
            type="number"
            className="mt-1 p-2 border rounded w-full"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Active</label>
          <input
            type="number"
            className="mt-1 p-2 border rounded w-full"
            value={active}
            onChange={(e) => setActive(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <div className="mt-1 flex items-center border rounded w-full">
            <span className="p-2">Rp.</span>
            <input
              type="number"
              className="p-2 flex-1 outline-none"
              value={price.toLocaleString("id-ID")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setPrice(Number(rawValue));
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

export default TambahPtn;
