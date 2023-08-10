const express = require('express');
const router = express();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchuser= require('../middleware/fetchuser')

const JWT_SECRET = 'anurag$boy'

var jwt = require('jsonwebtoken');
//Route 1 : create a user using post "/api/auth/createUser . no login required"

router.post('/createUser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    //if there are error the return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
    }

    //chech wether email exists or not

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({success, error: "sorry the user is  existes" })
        }

        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: secPass
            }
        )

        //     .then(user =>res.json(user))
        //    res.json({error:"This email is already registered"})

        // res.send(req.body);  Use res.json instead of res.send for JSON response
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success,authToken})
        res.json(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error is occures");
    }

});

//Route 2 : create a user using post "/api/auth/login . no login required"


router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password','password can not be blank').exists()
 
], async (req, res) => {
    let success = false
      //if there are error the return bad request and errors

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const {email,password} = req.body;

try {
    let user = await User.findOne({email})
    if(!user)
    {
        success = false;
        return res.status(400).json({success,error:"please login with right credentials"});
    }

    const comparePassword = await bcrypt.compare(password,user.password);

    if(!comparePassword)
    {
        success = false;
        return res.status(400).json({success,error:"please login with right credentials"});
    }
    const data = {
        user: {
            id: user.id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({success,authToken})
    
}  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
}

});

//Route 3 : fetch the user's details using post "/api/auth/getuser . login required"

router.post('/getuser', fetchuser, async (req, res) => {

try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.json(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
}

});
module.exports = router;