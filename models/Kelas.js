import mongoose from "mongoose";
import Matkul from "./Matkul.js";
import TahunAkademik from "./TahunAkademik.js";
import Dosen from "./Dosen.js";
import Mahasiswa from "./Mahasiswa.js";

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
});

const Kelas = mongoose.model('KelasPerkuliahan',KelasSchema);
export default Kelas;