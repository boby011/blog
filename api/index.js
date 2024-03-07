const express = require('express')
const app = express()
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const User = require('./models/user');
mongoose.connect('mongodb://127.0.0.1:27017/Blog')
    .then(() => console.log('Connected!'));
const db = mongoose.connection
app.use(express.json())
app.use(cors())
const saltrounds = 10;

app.post('/insert', async (req, res) => {
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ emailExists: true, message: 'Email Already Registered' });
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltrounds);
        const newUser = new User({
        ...req.body,
            password: hashPassword
        });
        console.log(newUser,'newuser');
        const response = await newUser.save();
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})