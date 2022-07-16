import mailer from "../core/mailer";

interface Mail {
  to: string;
  subject: string;
  html: string;
  callback: (err: Error | null) => void;
}

export const sendMail = ({ to, subject, html, callback }: Mail): void => {
  mailer.sendMail({
    from: 'church.social@inbox.ru', to, subject, html
  }, callback);
}
