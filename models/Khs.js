import mongoose from "mongoose";
import Mahasiswa from "./Mahasiswa";

const KhsSchema = new mongoose.Schema({
    nim : {
        type : mongoose.Schema.Types.ObjectId , ref : "Mahasiswa", required : true
    },
    mata_kuliah : [
        {
            kelas_perkuliahan : {
                type : mongoose.Schema.Types.ObjectId, ref : "Kelas"
            },
            mata_kuliah : {
                type : mongoose.Schema.Types.ObjectId, ref : "Matkul", required : true
            },
            dosen_pengampu : {
                type : mongoose.Schema.Types.ObjectId, ref : "Dosen", required : true
            },
            nilai_angka : {
                type : Number
            },
            nilai_huruf : {
                type : String
            },
            bobot : {
                type : Number
            }
        }
    ]
});

const Khs = mongoose.model("Khs",KhsSchema);
export default Khs ;