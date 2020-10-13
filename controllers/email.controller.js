require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { findOneAndUpdate, findOneUser } = require('../db/db.user.controllers');
const { sendgrid_api_key } = process.env;

sgMail.setApiKey(sendgrid_api_key);

const sendEmailVerification = async (user) => {
  try {
    const { useremail, authToken } = user;
    const msg = {
      to: `${useremail}`,
      from: 'test@test.com',
      subject: `Hello thank you for registering.`,
      text: ' Node.js',
      html: `Hello.
		Thank you for registering at localhost Please click the link below to complete yor activation
		<a href='http://localhost:8080/activate/${authToken}'>activate link</a>`,
    };
    const status = await sgMail.send(msg);

    await findOneAndUpdate({ useremail }, { $set: { isAuthenticated: false } });
    return status;
  } catch (error) {
    console.log(error);
  }
};

const updateAccountAfterEmailConfirmation = async (token) => {
  try {
    const user = await findOneUser({ authToken: token });

    const msg = {
      to: `${user.useremail}`,
      from: 'test@test.com',
      subject: `Hello Account Activated.`,
      text: ' Node.js',
      html: `Your account has benne successfully activated`,
    };
    sgMail.send(msg);

    const confirmationEmail = await findOneAndUpdate(
      { useremail: user.useremail },
      {
        $set: {
          authToken: null,
          isAuthenticated: true,
        },
      }
    );

    return confirmationEmail;
  } catch (error) {
    console.error(`Update Account After Email Confirmation:  ${error}`);
  }
};

module.exports = {
  sendEmailVerification,
  updateAccountAfterEmailConfirmation: updateAccountAfterEmailConfirmation,
};
