import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LihatPaket = () => {
  const { id } = useParams();
  const [namaPaket, setNamaPaket] = useState('');
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaket = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://127.0.0.1:8000/courses/view/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);

        setNamaPaket(data.nama_paket);
        setTotal(data.total);
        setActive(data.active);
        setPrice(data.price);
      } catch (error) {
        console.error("Error fetching paket:", error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaket();
    }
  }, [id]);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Detail Paket TryOut</h1>
      <div className="bg-gray-100 p-4 rounded-md space-y-4">
        <p><strong>Nama Paket:</strong> {namaPaket}</p>
        <p><strong>Total:</strong> {total}</p>
        <p><strong>Active:</strong> {active}</p>
        <p><strong>Harga:</strong> Rp {price.toLocaleString('id-ID')}</p>
      </div>
    </div>
  );
};

export default LihatPaket;
