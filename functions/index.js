// const functions = require('firebase-functions')
// const admin=require('firebase-admin');
// const nodemailer =require('nodemailer');
// admin.initializeApp()
// require('dotenv').config()

// const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

// exports.sendEmailNotification=functions.firestore.document('submissions/{docId}')
// .onCreate((snap,ctx)=>{
//     const data=snap.data();
//     let authData=nodemailer.createTransport({
//         host:'smtp.gmail.com',
//         port:465,
//         secure:true,
//         auth:{
//             user:SENDER_EMAIL,
//             pass:SENDER_PASSWORD
//         }
//     });
// authData.sendMail({
// from :'info@dimmo-conseil.com',
// to:`${data.email}`,
// subject:'Your submission Info',
// text:`${data.email}`,
// html:`${data.email}`,
// }).then(res=>console.log('successfully sent that mail')).catch(err=>console.log(err));

// });

const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs=require('fs'); 
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = "salioubah.samantech@gmail.com";
const gmailPassword = "samanTECH2020";
// const gmailEmail = "info@dimmo-conseil.com";
// const gmailPassword = "samantang@88";
const mailTransport = nodemailer.createTransport({
    type: "SMTP",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// var htmlmail=fs.readFileSync("../welcome.html","utf-8").toString();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const recipent_email = user.email; 
   
    const mailOptions = {
        from: '"AUDIO WAY" <info@dimmo-conseil.com>',
        to: recipent_email,
        subject: 'BIENVENUE SUR AUDIO WAY',
        html: 'Madame, Monsieur, <br><br> Nous vous souhaitons la bienvenue sur "audio way", l\'application destinée aux métiers de l\'audiprothèse. <br> <br> Nous vous remercions pour la confiance que vous nous accordez. <br> <br> Nous accusons réception de votre demande et nous nous engageons à vous contacter dans les meilleurs délais. <br><br> Toutefois, vous pouvez toujours vous connecter à nouveau sur votre espace personnel, grâce à votre identifiant et mot de passe, afin de modifier ou ajouter les localités de votre choix. <br><br> <b> Pour votre information, vos coordonnées ne seront pas transmis à nos clients sans votre accord préalable. </b> <br> <br> Merci pour votre confiance, <br> <br> Vous souhaitant bonne réception, <br><br> Cordialement,<br><br> <b>contact@audio-way.com </b> </br> </br> <img src="http://dimmo-conseil.com/wp-content/uploads/2014/10/Ear-Logo.png" width="200" height="200"/>'
    };
    
  try {
    mailTransport.sendMail(mailOptions);
    console.log('mail send');
    
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
return null; 
  });