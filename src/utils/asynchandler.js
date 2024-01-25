const asynchandler = (requesthandler)=> async (error,req,res,next)=>{
    try {
        await requesthandler(error,req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({
            success :false,
            message:error.message
        })
       
    }
}

export default asynchandler;


// const asynchandler = (requesthandler)=>{
//     (error,req,res,next)=>{
//         Promise.resolve(requesthandler(error,req,res,next)).catch((error)=>next(error))
//     }

// }