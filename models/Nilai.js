import mongoose from "mongoose";
import Mahasiswa from "./Mahasiswa";
import TahunAkademik from "./TahunAkademik";
import kelas from "./Kelas";

const NilaiSchema = new mongoose.Schema({
    mahasiswa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mahasiswa",
        required: true
    },
    tahun_akademik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TahunAkademik",
        required: true
    },
    nilai : [{
            kelas_perkuliahan: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "KelasPerkuliahan",
                required: true
        },
            nilai_angka : Number,
            nilai_huruf : String,
            nilai_bobot : Number,
    }],
    sks_tempuh :{
        type: Number,
        default: 0
    },
    sks_total : {
        type: Number,
        default: 0
    },
    ipk : {
        type: Number,
        default: 0
    },
    ips : {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    collection: 'Nilai',
});

const Nilai = mongoose.model('Nilai', NilaiSchema);
export default Nilai;