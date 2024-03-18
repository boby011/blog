const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add this line
const multer = require('multer');
const User = require('./models/user');
const Blog = require('./models/log')
const verifytoken = require('./models/verifytoken');
const path = require('path');
const fs = require('fs');
const { log } = require('console');


mongoose.connect('mongodb://127.0.0.1:27017/Blog')
    .then(() => console.log('Connected!'));
    
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
const saltrounds = 10;

app.post('/insert', async (req, res) => {
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ emailExists: true, message: 'Mail Id Registered' });
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltrounds);
        const newUser = new User({
            ...req.body,
            password: hashPassword
        });
        console.log(newUser, 'newuser');
        const response = await newUser.save();
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Fix here

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, 'abc');
        res.json({ user, token });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for uploaded files
    }
});

const upload = multer({ storage: storage });

app.post('/addblog', upload.single('image'), async (req, res) => {
    try {
        const { title, content, user } = req.body;
        const imagePath = req.file ? req.file.filename : '';
        const newBlog = new Blog({
            title: title,
            content: content,
            image: imagePath,
            user:user
        });
        const savedBlog = await newBlog.save();

        res.json({ message: 'Blog post added successfully', blog: savedBlog });
    } catch (error) {
        console.error('Error adding blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        let blogs = await Blog.find();
        if (blogs.length > 0) {
            const formattedBlogs = blogs.map(blog => {
                return {
                    _id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    image: blog.image ? blog.image : null,
                    User: blog.user
                };
            });
            res.json(formattedBlogs);
        } else {
            res.json({ result: 'No Blogs Found' });
        }
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve static files (images)
app.use('/uploads', express.static('uploads'));

app.get('/blogOne/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/findOne/:id', verifytoken, async (req, res) => {
    
        let id =req.params.id;
        console.log("hiyiyiy",id);
        let response=await User.findById(id)
        console.log(response);
        res.json(response)
})

app.put('/update/:id', verifytoken, upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        const newData = { ...req.body };
        const imagePath = req.file ? req.file.filename : undefined;

        console.log('olddddd',newData.password);
        const pass=newData.password;
        if(!newData.password){
            delete newData.password;
        }else{
            const hashPassword=await bcrypt.hash(newData.password,saltrounds);
            newData.password=hashPassword;
        }

       console.log('newww',newData.password);
       const response=await User.findByIdAndUpdate(id,newData,{new:true});
       if(!response){
        return
        res.status(404).json({message:'User not found'});
       }

       if(imagePath){
        if(response.image){
            const oldImagePath=path.join(__dirname,'uploads',response.image);
            if(fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath);
            }
        }
        response.image=imagePath;
       }
       

        const updatedUser=await response.save();
        res.json({message:'Profile updated succesfully',response:updatedUser}) ;
    }catch(error){
        console.log('Error updating profile',error);
        res.status(500).json({message:'Internal server error'});

    }  
});
  

app.get('/userblogs/:id', verifytoken, async (req, res) => {
    try {
      const id = req.params.id;
      const userBlogs = await Blog.find({ user: id });
      res.json(userBlogs);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
