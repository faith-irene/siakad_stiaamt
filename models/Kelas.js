import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars
import tahun_akademik from "./TahunAkademik.js";
// eslint-disable-next-line no-unused-vars
import matkul from "./Matkul.js";
// eslint-disable-next-line no-unused-vars
import dosen from "./Dosen.js";
// eslint-disable-next-line no-unused-vars
import mahasiswa from "./Mahasiswa.js"; 

const KelasSchema = new mongoose.Schema({
    nama_kelas : {
        type : String,
        required : true
    },
    tahun_akademik : {
        type : mongoose.Schema.Types.ObjectId, ref : "TahunAkademik", required : true
    },
    mata_kuliah : {
        type : mongoose.Schema.Types.ObjectId, ref : "Matkul", required : true
    },
    dosen : {
        type : mongoose.Schema.Types.ObjectId, ref : "Dosen", required : true
    },
    mahasiswa : [{
        type : mongoose.Schema.Types.ObjectId, ref : "Mahasiswa"
    }]
},{
    timestamps : true,
    collection : 'KelasPerkuliahan',
});

const Kelas = mongoose.model('KelasPerkuliahan',KelasSchema);
export default Kelas;