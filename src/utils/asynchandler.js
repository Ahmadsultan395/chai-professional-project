const asynchandler = (requesthandler) => async (req, res, next) => {
    try {
        await requesthandler(req, res, next);
    } catch (error) {
        const statusCode = error.code || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: error // Include the original error for debugging
        });
    }
}

export default asynchandler;



// const asynchandler = (requesthandler)=>{
//     (error,req,res,next)=>{
//         Promise.resolve(requesthandler(error,req,res,next)).catch((error)=>next(error))
//     }

// }