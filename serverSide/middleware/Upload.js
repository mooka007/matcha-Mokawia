import multer from "multer";
import path from "path";

//  file Storage
const storage = multer.diskStorage({    
    destination: (req ,file ,cb) =>{
        cb(null , "./public/assets");
    },
    filename:(req ,file ,cb)=>{
        cb(null, file.originalname);
    }
})
export const  upload = multer({
    storage: storage,
    // limits: { fileSize: '5000000' },
    fileFilter: (req, file, cb) => {
        const exts = /jpeg|png|jpg/
        const fileType = exts.test(file.mimetype)
        const imgExt = exts.test(path.extname(file.originalname))
        if(fileType && imgExt) return cb(null, true)
        cb(JSON.stringify('file uploded is invalid'))
        
    }
}).array('image',4)