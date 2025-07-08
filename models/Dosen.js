import mongoose from "mongoose";

const DosenScheme = new mongoose.Schema({
    nama : {
        type : String,
        required : true
    },
    status : {
        type : String
    },
    nidn : {
        type : String
    },
    jenis : {
        type : String
    },
    prodi : {
        type : String
    }
},{
    timestamps : false,
    collection : 'Dosen'
});

const Dosen = mongoose.model('Dosen',DosenScheme);

export default Dosen;