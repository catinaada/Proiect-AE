const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser,
      });

  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
        where: {
            email
        }
    })

    if (!existingUser) {
        return res.status(400).json({success: false, message: 'User not found', data: {}});
    }

    const isValidPassword = bcrypt.compareSync(password, existingUser.password);

    if (!isValidPassword) {
        return res.status(400).json({success: false, message: 'Not the same password', data: {}});
    }

    const token = jwt.sign({id: existingUser.id, role:existingUser.role}, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })

    res.status(200).json({success: true, message: 'Valid email and password', data: token})
});

router.post('/check', async (req, res) => {
    const token = req.body.token;

    if(!token){
        return res.status(400).json({success:false, message:"Token not found", data:{}})
    }

    const validToken = isValidToken(token);

    if (!validToken){
        return res.status(400).json({success:false, message:"Token not valid", data:{}})

    }

    res.status(200).json({success: true, message: 'Token is valid', data: {token}})

})




module.exports = router;
