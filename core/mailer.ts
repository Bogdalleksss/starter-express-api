import nodemailer from 'nodemailer';

const options = {
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'church.social@inbox.ru',
    pass: 'gVfuO9xvYkICaEQzIbKg'
  }
}

const transport = nodemailer.createTransport(options);

export default transport;
