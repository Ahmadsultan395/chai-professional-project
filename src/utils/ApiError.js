class ApiError extends Error {
 constructor(
    statuscode,
    message="something went wrong",
    errors=[],
    stack=""
     ){
        super(message);
        this.message=message,
        this.errors =errors,
        this.statuscode=statuscode,
        this.data=null,
        this.success=false

        if (stack) {
            this.stack=stack;
        } else {
            Error.captureStackTrace(this,this.constructor);
        }
     }
}

export default ApiError;
// second method of export
// export {ApiError};