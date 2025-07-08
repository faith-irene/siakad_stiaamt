import mongoose from "mongoose";

const MahasiswaSchema = new mongoose.Schema({
    nim : {
        type : Number,
        required : true
    },
    nama : {
        type : String,
        required : true
    },
    tempat_lahir : {
        type : String
    },
    tgl_lahir : {
        type : Date
    },
    kelamin : {
        type : String
    },
    nik : {
        type : Number
    },
    kode_prodi : {
        type : Number
    },
    nama_prodi : {
        type : String
    },
    angkatan : {
        type : Number
    }
},{
    timestamps : true,
    collection : 'Mahasiswa'
});

const Mahasiswa = mongoose.model('Mahasiswa',MahasiswaSchema);

export default Mahasiswa;