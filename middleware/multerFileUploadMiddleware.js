const multer = require('multer');

const multerStroage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/img/users');
    },
    filename:(req,file,cb)=>{
        const ext = file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const multerFilter = (req,file,cb)=>{
if(file.mimetype.startsWith('image')){
    cb(null, true)
}else{
    cb('Error in multer middleware')
}
};

const upload = multer({
    storage: multerStroage,
    fileFilter:multerFilter

});

exports.uploadPhoto = upload.single('photo')