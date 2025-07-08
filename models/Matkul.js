import mongoose from "mongoose";

const MatkulSchema = new mongoose.Schema({
    kode_matkul : {
        type : String
    },
    nama_matkul : {
        type : String
    },
    sks : {
        type : Number
    },
    prodi : {
        type : String
    }
},{
    timestamps : true,
    collection : 'Matkul',
});

const Matkul = mongoose.model('Matkul',MatkulSchema);

export default Matkul;