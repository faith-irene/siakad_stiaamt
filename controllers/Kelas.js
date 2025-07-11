import Kelas from '../models/Kelas.js';
import Mahasiswa from '../models/Mahasiswa.js';


export default class KelasPekuliahan {
    //ambil semua kelas
    getAllKelas = async (req,res) => {
        try {
            const result = await Kelas.find().populate("mata_kuliah","nama_matkul kode_matkul sks").populate("tahun_akademik","tahun_akademik semester").populate("dosen","nidn nama").populate("mahasiswa","nim nama");
            if (result.length === 0) {
                return res.status(404).json({message : "Data Kelas Kosong"});
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            // Log the error for debugging purposes
            res.status(400).json({message : "terjadi error"})
        }
    };
    

    //ambil satu kelas
    getKelas = async (req,res) => {
        try {
            const result = await Kelas.findById(req.params.id).populate("mata_kuliah","nama_matkul kode_matkul sks").populate("tahun_akademik","tahun_akademik semester").populate("dosen","nidn nama").populate("mahasiswa","nim nama");
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({message : "terjadi error"})
        }
    };

    //tambah kelas
    addkelas = async (req,res) => {
        try {
            const newKelas = new Kelas(req.body);
            await newKelas.save();
            res.status(200).json({ message : "Kelas Berhasil ditambahkan"});
        } catch (error) {
            res.status(402).json({message : error.message});
        }
    }

    // tambah mahasiswa satu persatu
    addMhs = async (req,res) => {
        const {id_kelas, nim } = req.body;
        
        try {
            const mahasiswa = await Mahasiswa.findOne({ nim : nim });
            if (!mahasiswa) {
                return res.json({message : "Mahasiswa tidak ditemukan"});
            }
            
            const kelas = await Kelas.findById({_id : id_kelas});
            if (!kelas){
                return res.status(404).json({message : "Kelas tidak ditemukan"});
            }

            if (kelas.mahasiswa.includes(mahasiswa._id)){
                return res.json({message : "Mahasiswa sudah terdaftar pada kelas ini"});
            }

            kelas.mahasiswa.push(mahasiswa);
            await kelas.save();
            res.status(200).json({ message : "Mahasiswa berhasil ditambahkan" });
        } catch (error) {
            res.status(400).json({ message : error });
        }
    }

    //hapus satu mahasiswa persatu
    delMhs = async (req,res) => {
        const {nim , id_kelas} = req.body; 
        try {
            const mahasiswa = await Mahasiswa.findOne({ nim : nim});
            if (!mahasiswa) {
                return res.json({ message : "Mahasiswa tidak ditemukan"});
            }
            const kelas = await Kelas.findById(id_kelas);
            if (!kelas) {
                return res.json({ message : "Kelas tidak ditemukan "});

            }
            kelas.mahasiswa.pull(mahasiswa._id);
            await kelas.save();
            res.status(200).json({ message : "Data Mahasiswa Berhasil dihapus"});
        } catch (error) {
            console.error(error);
            res.status(400).json({ message : "Terjadi Error !! " })
        }
    }

    // edit kelas
    putKelas = async (req,res) => {
        const { id } = req.params;
        const { nama_kelas, tahun_akademik, mata_kuliah, dosen } = req.body;

        try {
            const kelas = await Kelas.findById(id);
            if (!kelas) {
                return res.status(404).json({ message : "Kelas tidak ditemukan" });
            }

            kelas.nama_kelas = nama_kelas || kelas.nama_kelas;
            kelas.tahun_akademik = tahun_akademik || kelas.tahun_akademik;
            kelas.mata_kuliah = mata_kuliah || kelas.mata_kuliah;
            kelas.dosen = dosen || kelas.dosen;

            await kelas.save();
            res.status(200).json({ message : "Kelas berhasil diperbarui", data : kelas });    
        } catch (error) {
            res.status(400).json({ message : "Terjadi error" });
        }
    }

    delKelas = async (req,res) => {
        const { id } = req.params;
        try {
            const kelas = await Kelas.findById(id);
            if (!kelas) {
                return res.status(404).json({ message : "Kelas tidak ditemukan" });
            }
            await kelas.remove();
            res.status(200).json({ message : "Kelas berhasil dihapus" });
        } catch (error) {
            res.status(400).json({ message : "Terjadi error" });
        }
    }
    
}