import mongoose from "mongoose";

const TahunAkademikSchema = new mongoose.Schema({
    tahun_akademik : {
        type : String,
        required : true
    },
    semester : {
        type : String,
        
    },
    status : {
        type : Number 
    }
},{
    timestamps : false,
    collection : "TahunAkademik"
});

const TA = mongoose.model('TahunAkademik',TahunAkademikSchema);
export default TA ;

