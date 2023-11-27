import bcrypt from 'bcrypt'
import {users} from '../models/model.js'
class usersController {
    postRegister = async(req,res)=>{
        const {
            namaDepan,namaBelakang,email,password,confPassword
        } = req.body
        if(password !== confPassword){
            return res.status(400).json({
                msg:"Password dan Password Confirmation tidak sama"
            })
        }else{
            try{
                const salt = await bcrypt.genSalt()
                const hash = await bcrypt.hash(password, salt)
                await users.create({
                    namaDepan:namaDepan,namaBelakang:namaBelakang,
                    email:email,password:hash
                })
                return res.status(200).json({
                    msg:"Register berhasil"
                })
            }catch(error){
                console.log(error)
            }
        }
    }
    postLogin = async(req,res)=>{
        try {
            const data = await users.findAll({
                where:{
                    email:req.body.email
                }
            })
            if (data.length === 0) {
                return res.status(400).json({
                    msg:"Users account not found"
                })
            } else {
                const user = data[0]
                const match = await bcrypt.compare(req.body.password, user.password)
                if (!match) {
                    return res.status(400).json({
                        msg:"Password wrong"
                    })
                } else {
                    return res.status(200).json({
                        msg:"Login successfully"
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    getUsers = async(req,res)=>{
        try {
            const data = await users.findAll({
                order:[
                    ['createdAt','DESC']
                ],
                attributes:['namaDepan','namaBelakang','email','role','createdAt']
            })
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    findUser = async(req,res)=>{
        try {
            const data = await users.findOne({
                where:{id:req.params.id},
                attributes:['namaDepan','namaBelakang','email','role','createdAt']
            })
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    putUser = async(req,res)=>{
        const {namaDepan, namaBelakang, email, password} = req.body
        try {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password, salt)
            await users.update({
                namaDepan:namaDepan,namaBelakang:namaBelakang,email:email,password:hash
            },{
                where:{id:req.params.id}
            })
            return res.status(200).json({
                msg:"Update user successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new usersController