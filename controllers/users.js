require('dotenv').config();
const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

usersRouter.post('/', async (request , response) => {
     const { name, email, password, phone } = request.body;
    
     if (!name || !email || !password || !phone) {
        return response.status(400).json({error: 'All spaces are required'})
     }

     const userExist = await User.findOne({ email });

if (userExist) {
    return response.status(400).json({error: 'the email is in use'})
}

const saltRounds = 10;
const passwordHash = await bcrypt.hash(password, saltRounds);

const newUser = new User({
 name,
 email,
 passwordHash,
 phone
});

const savedUser = await newUser.save();
const token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { 
expiresIn: '1d',
});

const transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
auth: {
// TODO: replace `user` and `pass` values from <https://forwardemail.net>
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
}); 

await transporter.sendMail({
from: process.env.EMAIL_USER, // sender address
to: savedUser.email, // list of receivers
subject: 'Check user', // Subject line
html: `<a href="${PAGE_URL}/verify/${savedUser._id}/${token}">check email</a>`, //html body

});
return response.status(201).json('User created. Please check your email'); 
});

usersRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200);
    
  
 } catch (error) {
 //encontrar el email del usuario
  const id = request.params.id;
  const { email } = await User.findById(id);

  //firmar el nuevo token
  const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { 
    expiresIn: '1d',
    });
    
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
    }); 
    
    await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: 'Check user', // Subject line
    html: `<a href="${PAGE_URL}/verify/${id}/${token}">check email</a>`, //html body
    
    });
   }
 return response.status(400).json({error:'The link has expired. A new verification link has been sent to your email address.'});

});


 module.exports = usersRouter;