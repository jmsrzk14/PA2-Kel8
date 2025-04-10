import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPaket = () => {
  const { id } = useParams(); 
  const [namaPaket, setNamaPaket] = useState('');
  const [total, setTotal] = useState('');
  const [active, setActive] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/viewPacket/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);
        
        setNamaPaket(data.nama_paket);
        setTotal(data.total.toString());
        setActive(data.active.toString());
        setPrice(data.price.toString());
      } catch (error) {
        console.error("Error fetching paket:", error);
      }
    };

    fetchPaket();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", namaPaket);
    formData.append("total", total);
    formData.append("active", active);
    formData.append("price", price);

    console.log("Payload yang dikirim:", formData.toString());

    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/editPacket/${id}`, {
        method: "PUT",
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
        alert("Gagal mengupdate paket");
      }
    } catch (error) {
      console.error("Error saat mengupdate paket", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Paket TryOut</h1>
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
            type="text"
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
          <label className="block text-sm font-medium text-gray-700">Price</label>
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
          Simpan
        </button>
      </form>
    </div>
  );
};

export default EditPaket;
