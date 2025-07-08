import Mahasiswa from "../models/Mahasiswa.js";

export const getAllMahasiswa = async (req,res) => {
    try {
        const result = await Mahasiswa.find();
        return res.status(200).json({ status : 'berhasil' , data : result });
    } catch (error) {
        res.status(400).json({ message : error.message });
    }
}

export  const getMahasiswa = async (req,res) => {
    try {
        const result = await Mahasiswa.findOne({ nim : req.params.nim });
        if (!result) {
            res.status(404).json({ message : "Data Mahasiswa yang dicari tidak ada" });
        } else {
            res.status(200).json({ data : result });
        }
    } catch (error) {
        res.status(401).json({ message : "Ada yang salah dengan Query nya" });
    }
}

export const createMahasiswa = async (req,res) => {
    
    const Mhs = new Mahasiswa(req.body);
    try {
        const simpan = await Mhs.save();
        return res.status(201).json({message : "Data berhasil ditambahkan"});
        
    } catch (error) {
        res.status(400).json({ message : error });
    }
}

export const updateMahasiswa = async (req,res) => {
    //const { nim,nama } = req.body;
    const npm = req.params.nim;
    //const Mhs = new Mahasiswa(req.body);
    try {
        const ubah = await Mahasiswa.updateOne({ nim : `${npm}` },{ $set : req.body });
        return res.status(200).json({ message : "Data berhasil diubah"});
    } catch (error){
        res.status(400).json({ message : "Error merubah data mahasiswa"});
    }
}

export const deleteMahasiswa = async (req,res) => {
    try {
    await Mahasiswa.deleteOne({_id : req.params.id});
    return res.status(200).json({ message : "Data Berhasil dihapus" });
} catch (error) {
    res.status(401).json({message : error.message });
}
}