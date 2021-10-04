const jwt = require("jsonwebtoken")

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(authHeader,process.env.JWT_SEC,(err,user)=>{
            if(err){
                return res.status(403).json("invalid token")
            }
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You are not authenticated")
    }
}

export const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

export const verifyTokenAndSupervisor = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id && (req.user.isSupervisor || req.user.isAdmin )){
            next();
        }else{
            return res.status(403).json("You are not allowed to do that")
        }        
    })
}

export const verifyTokenAndStudent = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id && (req.user.isStudent || req.user.isAdmin) ){
            next();
        }else{
            return res.status(403).json("You are not allowed to do that")
        }        
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin ) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };



// module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}