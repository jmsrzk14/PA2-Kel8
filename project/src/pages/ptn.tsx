import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Eye, Pencil, Trash } from 'lucide-react';

type MajorPackage = {
  id_ptn: number;
  nama_ptn: string;
  nama_singkat: string;
};

interface Column {
  id: keyof MajorPackage; 
  label: string;
}

const columns: readonly Column[] = [
  { id: "nama_ptn", label: "Nama PTN" },
  { id: "nama_singkat", label: "Nama Singkat"},
];

const PtnContent = () => {
  const [packages, setPackages] = useState<MajorPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/university/list");
        if (!response.ok) {
          throw new Error("Data tidak ditemukan!");
        }
        const data: MajorPackage[] = await response.json();
        console.log("API Response:", data);
        setPackages(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/university/list/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Gagal menghapus paket");
        }
        setPackages((prev) => prev.filter((item) => item.id_ptn !== id));
      } catch (error) {
        alert(error);
      }
    }
  };

  if (loading) {
    return <p className="text-gray-700 text-center">Loading...</p>;
  }

  if (error) {
    return <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Perguruan Tinggi Negeri</h1>
        <Link to="/dashboard/university/tambahPaket" className="font-medium text-sm">
          <button className="flex items-center bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md transition-colors">
            Tambah PTN
          </button>
        </Link>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell  width={100}>No</TableCell>
              {columns.map((column) => (
                <TableCell width={400} align="center" key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell width={250} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell colspan={4} align="center"><p className="text-red-500">Data tidak ditemukan!</p></TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Perguruan Tinggi Negeri</h1>
        <Link to="/dashboard/university/tambahPtn" className="font-medium text-sm">
          <button className="flex items-center bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md transition-colors">
            Tambah PTN
          </button>
        </Link>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell  width={100}>No</TableCell>
              {columns.map((column) => (
                <TableCell width={400} align="center" key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell width={250} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((row, index) => (
              <TableRow hover tabIndex={-1} key={row.id_ptn} align="center">
                <TableCell>{index + 1}</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">
                    {row[column.id]}
                  </TableCell>                
                ))}
                <TableCell align="center">
                  <Link to={`/dashboard/university/viewPtn/${row.id_ptn}`}>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 3, minWidth: 30 }}><Eye size={20} /></Button>
                  </Link>
                  <Link to={`/dashboard/university/editPtn/${row.id_ptn}`}>
                    <Button variant="contained" color="warning" size="small" sx={{ mr: 3, minWidth: 30 }}><Pencil size={20} /></Button>
                  </Link>
                  <Button variant="contained" color="error" size="small" sx={{ mr: 1, minWidth: 30 }} onClick={() => handleDelete(row.id_ptn)}>
                    <Trash size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PtnContent;