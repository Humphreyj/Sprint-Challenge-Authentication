const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../auth/auth-model');
const secrets = require('../config/secrets')


router.post('/register', async(req, res) => {
  try {
    const {username} = req.body;
    const user = await Users.findBy({username}).first()
    if(user) {
      res.status(409).json({message: "That username is already taken"})
    }
    res.status(201).json(await Users.addUser(req.body))
  }catch(err) {
    // res.status(500).json({message: "There was an error creating your account."})
  }
});

router.post('/login', async(req, res) => {
  try {
      const { username, password} = req.body;

      const user = await Users.findBy({username}).first()
      const passwordValid = await bcrypt.compare(password,user.password);
      if(user && passwordValid) {
          const token = generateToken(user)
          res.status(200).json({id: user.id, token})
      }else {
          res.status(401).json({message: 'User cannot be found.'})
      }
     
  }catch(err) {
      
      res.status(500).json({message: "There was an error accessing your account."})
  }
  //Assume the token can be seen by anyone
  //DO NOT send sensitive data.
})

function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  }
  const options = {
      expiresIn: '1h'//This sweet little option come from the jwt library.
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
