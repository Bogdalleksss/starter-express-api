import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

const endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT || '');
const S3 = new AWS.S3({ endpoint });

export const fileUpload = (file: Express.Multer.File) => {
  const format = file.originalname.split('.').reverse()[0];
  const filename = `${file.fieldname}-${Date.now()}.${format}`;

  const params = {
    Bucket: process.env.S3_BUCKET || '',
    Key: filename,
    Body: file.buffer,
  };

  return new Promise((res, rej) => {
    S3.upload(params, (err: Error, data: any) => {
      if (err) rej(err);
      res({ ...data, format });
    });
  });
}

export const fileDelete = (key: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET || '',
    Key: key,
  };

  return new Promise((res, rej) => {
    S3.deleteObject(params, (err: Error) => {
      if (err) rej(err);
      res({
        status: 'success',
        data: {
          message: 'Успешно удалено'
        }
      })
    });
  });
}
