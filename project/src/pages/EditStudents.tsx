import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditSiswa = () => {
  const { username } = useParams(); 
  const [firstName, setFirstName] = useState('');
  const [no_utbk, setNoUtbk] = useState('');
  const [nisn, setNisn] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/students/view/${username}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);
        
        setFirstName(data.first_name);
        setNoUtbk(data.no_utbk.toString());
        setNisn(data.nisn.toString());
        setGrade(data.grade);
      } catch (error) {
        console.error("Error fetching paket:", error);
      }
    };

    fetchPaket();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("first_name", firstName);
    formData.append("no_utbk", no_utbk);
    formData.append("nisn", nisn);
    formData.append("grade", grade);

    console.log("Payload yang dikirim:", formData.toString());

    try {
      const response = await fetch(`http://127.0.0.1:8000/students/edit/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const result = await response.json();
      console.log("Response API:", result);

      if (response.ok) {
        navigate("/dashboard/students/list");
      } else {
        alert("Gagal mengupdate paket");
      }
    } catch (error) {
      console.error("Error saat mengupdate paket", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Data Siswa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Siswa</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">No UTBK</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={no_utbk}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, "");
              setNoUtbk(rawValue);
            }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NISN</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={nisn}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, "");
              setNisn(rawValue);
            }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Grade</label>
          <div className="mt-1 border rounded w-full">
            <select
              className="p-2 w-full outline-none"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value="TIDAK TES">TIDAK TES</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="LULUS">LULUS</option>
              <option value="SUPERINTENSIF">SUPERINTENSIF</option>
            </select>
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

export default EditSiswa;
