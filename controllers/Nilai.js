import Nilai from "../models/Nilai.js";
import Mahasiswa from "../models/Mahasiswa.js";
import TahunAkademik from "../models/TahunAkademik.js";
import KelasPerkuliahan from "../models/Kelas.js";

export default class NilaiController {

    getHuruf = (nilai) => {
        if (nilai >= 85 && nilai <= 100) return "A";
        if (nilai >= 80 && nilai < 85) return "A-";
        if (nilai >= 75 && nilai < 80) return "B+";
        if (nilai >= 70 && nilai < 75) return "B";
        if (nilai >= 65 && nilai < 70) return "B-";
        if (nilai >= 60 && nilai < 65) return "C+";
        if (nilai >= 55 && nilai < 60) return "C";
        if (nilai >= 50 && nilai < 55) return "C-";
        if (nilai >= 45 && nilai < 50) return "D";
        return "E"; // Nilai di bawah 45
    }

    getBobot = (huruf) => {
        switch (huruf) {
            case "A": return 4.0;
            case "A-": return 3.7;
            case "B+": return 3.3;
            case "B": return 3.0;
            case "B-": return 2.7;
            case "C+": return 2.3;
            case "C": return 2.0;
            case "C-": return 1.7;
            case "D": return 1.0;
            case "E": return 0.0;
            default: return 0.0; // Jika huruf tidak dikenali, kembalikan 0.0
        }
    }

    // Get all Nilai
    getAllNilai = async (req, res) => {
        try {
            const result = await Nilai.find().populate("mahasiswa", "nim nama").populate("tahun_akademik", "tahun_akademik semester");
            if (result.length === 0) {
                return res.status(404).json({ message: "Data Nilai Kosong" });
                }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Terjadi error" });
        }
    }
    // Get Nilai by ID
    getNilaiById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Nilai.findById(id).populate("mahasiswa", "nim nama").populate("tahun_akademik", "tahun_akademik semester").populate({
                path: "nilai.kelas_perkuliahan",
                populate: [
                    {
                        path: "dosen",
                        select: "nama"
                    },
                    {
                        path: "mata_kuliah",
                        select: "nama_matkul kode_matkul sks"
                    }
                ]
            });
            if (!result) {
                return res.status(404).json({ message: "Data Nilai tidak ditemukan" });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Terjadi error" });
        }
    }

    // get Nilai by Mahasiswa NIM
    getNilaiByMahasiswa = async (req, res) => {
        const { nim } = req.body;
        try {
            const result = await Nilai.findOne({ mahasiswa: nim }).populate("mahasiswa", "nim nama").populate("tahun_akademik", "tahun_akademik semester").populate({
                path: "nilai.kelas_perkuliahan",
                populate: [
                    {
                        path: "dosen",
                        select: "nama"
                    },
                    {
                        path: "mata_kuliah",
                        select: "nama_matkul kode_matkul sks"
                    }
                ]
            });
            if (!result) {
                return res.status(404).json({ message: "Data Nilai Mahasiswa tidak ditemukan" });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Terjadi error" });
        }
    }
    // Create Nilai
    createNilai = async (req, res) => {
        const { mahasiswa, tahun_akademik, nilai } = req.body;
        try {
            // Check if Mahasiswa exists
            const mhs = await Mahasiswa.findOne({ nim: mahasiswa });
            if (!mhs) {
                return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
            }
            // Check if Tahun Akademik exists
            const ta = await TahunAkademik.findById(tahun_akademik);
            if (!ta) {
                return res.status(404).json({ message: "Tahun Akademik tidak ditemukan" });
            }
            // Create Nilai
            let nilailengkap = [];
            let sks_tempuh = 0;
            for (const item of nilai){
                const kelas = await KelasPerkuliahan.findById(item.kelas_perkuliahan);
                if (!kelas) {
                    return res.status(404).json({ message: `Kelas Perkuliahan dengan ID ${item.kelas_perkuliahan} tidak ditemukan` });
                }
                const sks = kelas.mata_kuliah?.sks || 0;
                const nilai_angka = item.nilai_angka;
                const nilai_huruf = this.getHuruf(nilai_angka);
                const nilai_bobot = this.getBobot(nilai_huruf);

                nilailengkap.push({
                    kelas_perkuliahan: item.kelas_perkuliahan,
                    nilai_angka: nilai_angka,
                    nilai_huruf: nilai_huruf,
                    nilai_bobot: nilai_bobot
                });
                sks_tempuh += sks;
            }
                // Hitung sks total
                const nilai_sebelumnya = await Nilai.findOne({ mahasiswa: mhs._id, tahun_akademik: ta._id });
                const sks_sebelumnya = nilai_sebelumnya.reduce((total,item) => total + (item.sks_tempuh ||0), 0);
                
                // Hitung IPK dan IPS
                let ips = 0;
                if (sks_tempuh > 0){
                    ips = nilailengkap.reduce((total, item) => total + (item.nilai_bobot * (kelas.mata_kuliah?.sks || 0)), 0) / sks_tempuh;
                }
                console.log("IPS: ", ips);
                let ipk = 0;
                if (sks_tempuh + sks_sebelumnya > 0) {
                    const nilai_total = nilailengkap.reduce((total, item) => total + (item.nilai_bobot * (kelas.mata_kuliah?.sks || 0)), 0);
                    ipk = nilai_total / (sks_tempuh + sks_sebelumnya);
                }
                console.log("IPK: ", ipk);

                // Simpan data Nilai
                const newNilai = new Nilai({
                    mahasiswa: mhs._id,
                    tahun_akademik: ta._id,
                    nilai: nilailengkap,
                    sks_tempuh: sks_tempuh,
                    sks_total: sks_tempuh + sks_sebelumnya,
                    ipk: ipk,
                    ips: ips
                });
            // Save Nilai
            console.log("Nilai Lengkap: ", nilailengkap);
            console.log("SKS Tempuh: ", sks_tempuh);
            console.log("SKS Total: ", sks_tempuh + sks_sebelumnya);
            console.log("IPK: ", ipk);
            console.log("IPS: ", ips); 
            console.log("Data Nilai: ", newNilai);
            await newNilai.save();
            res.status(201).json({ message: "Data Nilai berhasil ditambahkan", data: newNilai });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Terjadi error" });
        }
    }
}