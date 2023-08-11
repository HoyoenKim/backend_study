const mailer = require('nodemailer');
const welcome = require('./welcome_template');
const goodbye = require('./goodbye_template');
// ecmascript, commonjs import, export 방식

const getEmailData = (to, name, template) => {
    let data = null;
    console.log(to, name, template);

    switch (template) {
        case "welcome":
            data = {
                from: process.env.EMAIL_USER,
                to: to,
                subject: `welcome ${name}`,
                html: welcome()
            }
            break;
        case "goodbye":
            data = {
                from: process.env.EMAIL_USER,
                to: to,
                subject: `goodbye ${name}`,
                html: goodbye()
            }
            break;
        default:
            data;
    }

    return data;
}

const sendMail = (to, name, type) => {
    const transporter = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    
    const mail = getEmailData(to, name, type);
    transporter.sendMail(mail, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
            console.log(res);
        }
    
        transporter.close();
    })
}

module.exports = sendMail;