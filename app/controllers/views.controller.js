import {views,users} from "../models/model.js"

class viewsController{
    postView = async(req,res)=>{
        const {userId, journalId} = req.body
        try {
            await views.create({
                userId:userId,journalId:journalId
            })
            return res.status(200).json({
                msg:"Anda Sedang melihat jurnal"
            })
        } catch (error) {
            console.log(error)
        }
    }
    getView = async(req,res)=>{
        try {
            const data = await views.findAll({
                order:[['createdAt','DESC']],
                attributes:['createdAt'],
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
}

export default new viewsController