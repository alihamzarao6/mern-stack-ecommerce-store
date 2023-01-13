const sendgrid = require("@sendgrid/mail");



// sendgrid
//   .send(msg)
//   .then((resp) => {
//     console.log("Email sent\n", resp);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const sendEmail2 = async (options) => {
    const SENDGRID_API_KEY = "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";

    sendgrid.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: options.email,

      // Change to your recipient
      from: "myworkera909@gmail.com",
      // Change to your verified sender
      subject: options.subject,
      text: options.message,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    await sendgrid.send(msg);
};

module.exports = sendEmail2;
