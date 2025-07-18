import express from 'express';
import { getAllMahasiswa , getMahasiswa, createMahasiswa, updateMahasiswa, deleteMahasiswa } from '../controllers/Mahasiswa.js';
import { getJurusan, getSingleJurusan, insertJurusan, updateJurusan, deleteJurusan } from '../controllers/Prodi.js';
import { getDosen, getAllDosen, createDosen, updateDosen, deleteDosen } from '../controllers/Dosen.js';

import NilaiController from '../controllers/Nilai.js';
import KelasPekuliahan from '../controllers/Kelas.js';

const routes = express.Router();
const KP = new KelasPekuliahan();
const NP = new NilaiController();
// Mahasiswa
routes.get('/mahasiswa', getAllMahasiswa);
routes.get('/mahasiswa/:nim', getMahasiswa);
routes.post('/mahasiswa',createMahasiswa);
routes.put('/mahasiswa/:nim', updateMahasiswa);
routes.delete('/mahasiswa/:id',deleteMahasiswa);

// Program Studi
routes.get('/program_studi',getJurusan);
routes.get('/program_studi/:code',getSingleJurusan);
routes.post('/program_studi',insertJurusan);
routes.put('/program_studi/:code', updateJurusan);
routes.delete('/program_studi/:id', deleteJurusan);

//Dosen
routes.get('/dosen/',getAllDosen);
routes.get('/dosen/:search',getDosen);
routes.post('/dosen',createDosen);
routes.put('/dosen/:id',updateDosen);
routes.delete('/dosen/:id',deleteDosen);

// Kelas Perkuliahan
routes.post('/kelasperkuliahan',KP.addkelas);
routes.get('/kelasperkuliahan',KP.getAllKelas);
routes.get('/kelasperkuliahan/:id',KP.getKelas);
routes.post('/kelastambahmahasiswa',KP.addMhs);
routes.post('/kelashapusmahasiswa',KP.delMhs);
routes.delete('/kelasperkuliahan/:id',KP.delKelas);
routes.put('/kelasperkuliahan/:id',KP.putKelas);

//Nilai
routes.get('/nilai', NP.getAllNilai);
routes.get('/nilai/:id', NP.getNilaiById);
routes.post('/nilaimahasiswa', NP.getNilaiByMahasiswa);
routes.post('/nilaitambah', NP.createNilai);
export default routes;