import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Eye, Pencil, Trash } from 'lucide-react';

type Students = {
  username: string;
  nisn: string;
  first_name: string;
  kelompok_ujian: string;
};

interface Column {
  id: keyof Students; 
  label: string;
}

const columns: readonly Column[] = [
  { id: "first_name", label: "Nama" },
  { id: "kelompok_ujian", label: "Kelompok Ujian"},
];

const StudentsContent = () => {
  const [packages, setPackages] = useState<Students[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/students/list");
        if (!response.ok) {
          throw new Error("Data tidak ditemukan!");
        }
        const data: Students[] = await response.json();
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

  const handleDelete = async (username: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/students/list/${username}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Gagal menghapus siswa");
        }
        window.location.reload();
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Siswa</h1>
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Siswa</h1>
        {/* <Link to="/dashboard/courses/tambahPaket" className="font-medium text-sm">
          <button className="flex items-center bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md transition-colors">
            Tambah Paket TryOut
          </button>
        </Link> */}
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
              <TableRow hover tabIndex={-1} key={row.username} align="center">
                <TableCell>{index + 1}</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">
                      {row[column.id]}
                  </TableCell>                
                ))}
                <TableCell align="center">
                  <Link to={`/dashboard/students/viewSiswa/${row.username}`}>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 3, minWidth: 30 }}><Eye size={20} /></Button>
                  </Link>
                  <Link to={`/dashboard/students/edit/${row.username}`}>
                    <Button variant="contained" color="warning" size="small" sx={{ mr: 3, minWidth: 30 }}><Pencil size={20} /></Button>
                  </Link>
                  <Button variant="contained" color="error" size="small" sx={{ mr: 1, minWidth: 30 }} onClick={() => handleDelete(row.username)}>
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

export default StudentsContent;