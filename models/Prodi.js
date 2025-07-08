import mongoose from "mongoose";

const ProdiSchema = new mongoose.Schema({
    code : {
        type : String
    },
    name : {
        type : String
    }
});

const Prodi = mongoose.model('Prodi',ProdiSchema);
export default Prodi;