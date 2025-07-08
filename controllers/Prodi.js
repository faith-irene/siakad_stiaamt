import Mahasiswa from "../models/Mahasiswa.js";
import Prodi from "../models/Prodi.js";

export const getJurusan = async (req,res) => {
    try {
        const result = await Prodi.find();
        return res.json({ data : result });
    } catch (error) {
        res.json({ message : "Jurusan tidak ada sama sekali" });
    }
}

export const getSingleJurusan = async (req,res) => {
    try {
        const result = await Prodi.findOne({ code : req.params.code});
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({ message : "Program Studi dengan kode yang dicari tidak ditemukan" });
        }
    } catch(error) {
        res.status(400).json({message : "Error Telah Terjadi"})
    }
}

export const insertJurusan = async (req,res) => {
    const ProgramStudi = new Prodi(req.body);
    try {
        await ProgramStudi.save();
        return res.json({ message : "Data berhasil disimpan" });
    } catch(error) {
        res.send(error);
    }
}

export const updateJurusan = async (req,res) => {
    const code = req.params.code;
    try {
        const ubah = await Prodi.updateOne({ code : code },{ name : req.body.name });
        return res.status(200).json({ message : "Sukses diubah" });
    } catch (error) {
        res.json({ message : "Terjadi error"});
    }
}

export const deleteJurusan = async (req,res) => {
    const id = req.params.id;
    try {
        await Prodi.deleteOne({ _id : id });
        return res.json({ message : "Data Prodi sudah dihapus" });
    } catch (error) {
        res.json({ message : `Terjadi kesalahan pada ${error}` });
    }
}