

export const Post = (data,req,res,next)=>{
    if(`req.body.${data}`){
        next()
    }else{
        res.status(400).json("Provide "+data+" in request body")
    }
}

export const Get = (data,req,res,next)=>{
    if(`req.query.${data}`){
        next()
    }else{
        res.status(400).json("Provide "+data+" in url")
    }
}

