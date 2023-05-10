const sgMail = require('@sendgrid/mail')
require('dotenv').config({ path: '../config.env' })


sgMail.setApiKey(process.env.SG_KEY)

const sendSGMail = async ({
    recipient,
    sender,
    subject,
    html,
    text,
    attachments
}) => {
    try {


        const from = sender || 'Contact@RSolution@gmail.com'
        const msg = {
            to: recipient,  // recipient's email
            from: from,     //  sender's email
            subject,
            html,
            text,
            attachments,
        }
        return sgMail.send(msg)
        //~   ___ this "sgMail.send(msg)" returns a promise that's why we will be able to
        //~  apply .then() .catch() methods on it.

    }
    catch (err) {
        console.log(err)
    }
}

//^  we uses this if else condition here because we don't want to
//^  send unusual testing emails to the consumers.

exports.sendEmail = async (args) => {

    if (process.env.NODE_ENV === 'development') {
        return Promise.resolve()
    }
    else {
        return sendSGMail(args)
    }
}