const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log(process.env);

// for this view video 3.5 at 11 minutes to heroku config the password
const password = process.env.PASSWORD

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + `/public/index.html`)
});

// Code from EmailJS


// To make this work with locally first take off the Gmail's security
// Now to make it work with Heroku deployment go to https://accounts.google.com/b/0/DisplayUnlockCaptcha and make sure only one Gmail account is open in the browser
// After refreshing the page with the Gmail that is logged in, it should work.
app.post('/', (req, res) => {
    console.log(req.body);

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'reidzuckermanmusic@gmail.com',
    //         pass: `${password}`
    //     }
    // })

    //  set the new transporter service to this from this article https://jay315.medium.com/sending-email-using-express-js-with-nodemailer-in-heroku-71741f29463c
    // seemed like the UNLOCK CAPTCHA page only worked temporarily, so had to allow POP and SMTP from everywhere from this article https://support.google.com/mail/thread/9828582/how-to-unlock-captcha?hl=en
    // person here says port 465 needs to be open on heroku https://stackoverflow.com/questions/44729580/how-can-i-get-nodemailer-to-work-with-heroku
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'reidzuckermanmusic@gmail.com',
            pass: `${password}`
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'reidzuckermanmusic@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        } else {
            console.log(`Email sent: ` + info.response);
            res.send('success');
        }
    })
})

// OUTLOOK

// var transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com", // hostname
//     secureConnection: false, // TLS requires secureConnection to be false
//     port: 587, // port for secure SMTP
//     tls: {
//        ciphers:'SSLv3'
//     },
//     auth: {
//         user: 'reidzuckermanmusic2@outlook.com',
//         pass: `${password}`
//     }
// });

// // setup e-mail data, even with unicode symbols
// var mailOptions = {
//     from: `"Tester", <reidzuckermanmusic2@outlook.com>`, // sender address (who sends)
//     to: '<reidzuckermanmusic@outlook.com>', // list of receivers (who receives)
//     subject: `${req.body.subject}`, // Subject line
//     text: `${req.body.subject}`, // plaintext body
//     html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }

//     console.log('Message sent: ' + info.response);
//     alert('sent')
// });

// })

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});