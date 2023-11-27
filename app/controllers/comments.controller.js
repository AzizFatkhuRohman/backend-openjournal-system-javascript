import { comments } from "../models/model.js"

class commentsController{
    postComment = async(req,res)=>{
        const {journalId,userId,pesan} = req.body
        try {
            await comments.create({
                journalId:journalId,userId:userId,pesan:pesan
            })
            return res.status(200).json({
                msg:"Komentar berhasil di kirim"
            })
        } catch (error) {
            console.log(error)
        }
    }
    putComment = async(req,res)=>{
        try {
            await comments.update({
                pesan:req.body.pesan
            },{
                where:{id:req.params.id}
            })
            return res.status(200).json({
                msg:"Comment update success"
            })
        } catch (error) {
            console.log(error)
        }
    }
    destroyComment = async(req,res)=>{
        try {
            await comments.destroy({
                where:{id:req.params.id}
            })
            return res.status(200).json({
                msg:"Delete comment success"
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new commentsController