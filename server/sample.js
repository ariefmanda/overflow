const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const msg = {
  to: 'arief.manda57@gmail.com',
  from: 'arief.manda56@gmail.com <ariefmanda>',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
