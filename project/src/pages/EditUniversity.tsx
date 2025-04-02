import React, { useState, useEffect, act } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPtn = () => {
  const { id_ptn } = useParams(); 
  const [namaPtn, setNamaPtn] = useState('');
  const [namaSingkat, setNamaSingkat] = useState('');
  const [alamatWeb, setAlamatWeb] = useState('');
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/university/view/${id_ptn}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);
        
        setNamaPtn(data.nama_ptn);
        setNamaSingkat(data.nama_singkat);
        setAlamatWeb(data.alamat_web);
        setActive(data.active);
      } catch (error) {
        console.error("Error fetching paket:", error);
      }
    };

    fetchPaket();
  }, [id_ptn]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", namaPtn);
    formData.append("nameShort", namaSingkat);
    formData.append("url", alamatWeb);
    formData.append("active", active.toString());

    console.log("Payload yang dikirim:", formData.toString());

    try {
      const response = await fetch(`http://127.0.0.1:8000/university/edit/${id_ptn}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const result = await response.json();
      console.log("Response API:", result);

      if (response.ok) {
        navigate("/dashboard/university/list");
      } else {
        alert("Gagal mengupdate paket");
      }
    } catch (error) {
      console.error("Error saat mengupdate paket", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Perguruan Tinggi Negeri</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama PTN</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={namaPtn}
            onChange={(e) => setNamaPtn(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={namaSingkat}
            onChange={(e) => setNamaSingkat(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Active</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={alamatWeb}
            onChange={(e) => setAlamatWeb(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <div className="mt-1 flex items-center border rounded w-full">
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

export default EditPtn;
