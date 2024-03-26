const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { TokenVerification } = require('../middlewares/Auth')
const { transporter } = require('../middlewares/NodeMailer')

const cryptPassword = (password) => {
    if (!password) {
        return ''
    }
    else {
        try {
            return crypto.createHmac('sha1', process.env.PASSWORD_SALT)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    }
}

const Register = asyncHandler((req, res) => {
    const { email,  password } = req.body;
    const data = new User(req.body)
    User.findOne( {email} ,(error, user) => {
        if (error){
            return  res.status(400).send("Network Error.")
        }

        if (user){
            return  res.status(400).send("User already in use")
        }else {
            data.password = cryptPassword(password)
            data.save((err, user) => {
                if (err) return res.status(222).send(err.message);
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                transporter.sendMail({
                    from: `"Matcha Mokawia :)" <${process.env.EMAIL}>`,
                    to: user.email,
                    subject: "Email Verification :) .",
                    html: `<p>Click <a href="http://localhost:8080/api/auth/emailVerification/${token}">Here</a> to verify your email address.</p>`
                }).then(e => {
                    return res.status(200).send('An email has been sent to your email for verification.')
                })
            })
        }

    })
})

const Login = asyncHandler((req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (error, user) => {

        if (error) {
            return res.status(222).send('Network error.')
        }

        if (!user) {
            return res.status(222).send('Invalid email or password.')
        }

        if (!user.authenticated(password)) {
            return res.status(222).send('Invalid email or password.')
        }

        if (!user.verification === true) {
            return res.status(222).send('Account not verified yet.')
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        )
        return res.cookie('token', token, { maxAge: 86400000 }).status(200).send(token)
    })
})


const VerifyEmail = asyncHandler((req, res) => {
    const token = req.params.token
    TokenVerification(token).then(async (data) => {
        if (data) {
            _id = data.id
            User.findOne({ _id }, (error, user) => {
                if (user) {
                    if (!user.verification) {
                        let newData = user
                        newData.verification = true
                        updateUserData(_id, newData)
                        return res.status(200).send('Account successfully verified.')
                    }
                    else {
                        return res.status(200).send('Account already verified.')
                    }
                }
                else {
                    res.send('Account data not found.')
                }
            })
        }
        else {
            res.send('Invalid token.')
        }
    })
})

