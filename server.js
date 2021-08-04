const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log(process.env);

// for this view video 3.5 at 11 minutes to heroku config the password
const password = process.env.PASSWORD

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + `/public/index.html`)
});

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

    //  set the new transporter service to this 
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

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});