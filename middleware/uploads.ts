import multer from "multer";

const filename = (req: any, file: any, cb: any) => {
  const filename = file.originalname.split('.')
  const format = filename[filename.length - 1];

  cb(null, `${file.fieldname}-${Date.now()}.${format}`);
}

const storage_image = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename
});

const storage_video = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos');
  },
  filename
});

export const upload = multer({});
