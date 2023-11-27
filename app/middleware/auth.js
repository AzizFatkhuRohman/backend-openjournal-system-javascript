const adminLogin = async(req,res,next) =>{
    if (req.headers.role !== 'admin') {
        return res.status(401).json({
            msg:"Unathorized"
        })
    } else {
        next()
    }
}
const userLogin = async(req,res,next) =>{
    if (req.headers.role !== 'user') {
        return res.status(401).json({
            msg:"Unathorized"
        })
    } else {
        next()
    }
}

export {adminLogin, userLogin}