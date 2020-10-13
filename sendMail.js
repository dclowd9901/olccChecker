import sgMail from '@sendgrid/mail';

function sendMail(body) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: 'david.ddrew@gmail.com', // Change to your recipient
        from: 'david.ddrew@gmail.com', // Change to your verified sender
        subject: 'OLCC Listings have updated...',
        text: body,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

export default sendMail;