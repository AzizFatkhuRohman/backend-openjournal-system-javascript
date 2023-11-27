import { comments, journals, users, views} from "../models/model.js"
class journalsController {
  postJournal = async (req, res) => {
    const { userId,deskripsi } = req.body
    try {
      if (!req.file) {
        return res.status(400).json({
          msg:"Tidak ada jurnal yang di unggah"
        })
      } else {
        const fileJurnal = req.file.filename
        await journals.create({
          userId: userId,
          fileJurnal: fileJurnal,
          deskripsi: deskripsi
        });
        return res.status(200).json({
          msg: "Jurnal berhasil di unggah"
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Terjadi kesalahan saat mengunggah jurnal",
      });
    }
  }
  putJournal = async (req, res) => {
    const { deskripsi } = req.body;
    const { id } = req.params;
  
    try {
      const existingJournal = await journals.findByPk(id);
  
      if (!existingJournal) {
        return res.status(404).json({
          msg: 'Jurnal tidak ditemukan'
        });
      }
      await journals.update(
        { deskripsi: deskripsi },
        { where: { id: id } }
      );
  
      return res.status(200).json({
        msg: 'Deskripsi Jurnal berhasil diubah'
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  getJournal = async(req,res)=>{
    try {
        const data = await journals.findAll({
            order:[
                ['createdAt','DESC']
            ],
            // menampilkan semua data journal Descending berikut nama user pembuat
            include:[
              {
                model:users,
                attributes:['namaDepan','namaBelakang']
              }
            ]
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
  }
  findJournal = async(req,res)=>{
    try {
      const data = await journals.findOne({
        where: { id: req.params.id},
        // Menampilkan data journal sesuai id dengan commentar berikut user pembuat komentar
        include:[
          {
            model:comments,
            where:{journalId:req.params.id},
            attributes:['pesan', 'createdAt'],
            include:[
              {
                model:users,
                attributes:['namaDepan','namaBelakang']
              }
            ]
          },
          //Menampilkan yang sudah melihat journal
          {
            model:views,
            attributes:['createdAt'],
            include:[{
              model:users,
              attributes:['id','namaDepan','namaBelakang']
            }]
          },
          //Menampilkan user pembuat journal
          {
            model:users,
            attributes:['namaDepan','namaBelakang']
          }
        ]
      });
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
  }
  destroyJournal = async(req,res)=>{
    try {
      await journals.destroy({
        where:{id:req.params.id}
      })
      return res.status(200).json({
        msg:"Journals berhasil di hapus"
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new journalsController;