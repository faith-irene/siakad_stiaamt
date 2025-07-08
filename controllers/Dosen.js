import e from "express";
import Dosen from "../models/Dosen.js";

export const getAllDosen = async (req,res) => {

    try {
        const result = await Dosen.find();
        return res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ message : "Pesan Error ini berkaitan dengan error" });
    }

}

export const getDosen = async (req,res) => {
    // try {
    //     const result = await Dosen.findById({ _id : req.params.id });
    //     if (result) {
    //         return res.json(result);
    //     } else {
    //         return res.json({ message : "Data Dosen tidak ditemukan" });
    //     }
    // } catch (error) {
    //     res.status(400).json( { message : error})
    // }
    const { search } = req.params;
    //const cleanSearch = search.trim();
    try {
        const isNIDN = /^\d+$/.test(search);
        let dosen;
        if (isNIDN) {
            dosen  = await Dosen.findOne({ nidn : search });
        } else {
            dosen = await Dosen.find({nama : new RegExp(search,'i') });
        }
        if (!dosen || dosen.length === 0) {
            return res.status(404).json({ message : "Dosen tidak ditemukan" });
        }
        res.json(dosen);
        
    } catch (error) {
        res.status(500).json({ message : "Terjadi kesalahan", error });
    }
}

export const createDosen = async (req,res) => {
    const dosen = new Dosen(req.body);
    try {
        await dosen.save();
        return res.status(200).json({message : "Data Dosen baru berhasil ditambahkan"});
    } catch (error) {
        res.status(401).json({ message : "terjadi kesalahan" });
    }
}

export const updateDosen = async (req,res) => {
    const id = req.params.id;
    try {
        await Dosen.updateOne({ _id : id },{ $set : req.body });
        return res.json({message : "Data Dosen berhasil diubah"});
    } catch (error) {
        res.status(400).json({ message : "Error" })
    }
}

export const deleteDosen = async (req,res) => {
    const id = req.params.id;
    try {
        await Dosen.deleteOne({ _id : id});
        return res.json({ message : "Dosen berhasil terhapus"});
    } catch (error) {
        res.status(400).json({ message : `Ada terjadi kesalahan : ${error}` });
    }
}