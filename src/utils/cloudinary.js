import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.clOUDINARY_CLOUD_NAME, 
  api_key: process.env.clOUDINARY_API_KEY, 
  api_secret: process.env.clOUDINARY_API_SECRET
});


const uploadonCloudinary = async (filelocalpath)=>{
    try {
        if(!filelocalpath) return null;
        // uploading file on cloudinary 
     const response = await  cloudinary.uploader.upload(filelocalpath,
            {resource_type:'auto'});
            // check file has been uploaded sucessfully 
            console.log("file upload successfully ",response.url)
            return response;
    } catch (error) {
        fs.unlinkSync(filelocalpath);
        // remove temporery locally saved file if operation got failed
        return null;
    }
}

export default uploadonCloudinary;

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });