const express = require('express')
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const Usermodule = require('./module/Usermodule');
const Post = require('./module/Post')
const Comment = require('./module/Comment');
const bcrypt = require("bcrypt");
const secretKey = "42sfkl;jdf;o0923rujwefolkjsd";
const jwt = require("jsonwebtoken");
const Category = require('./module/Category');
const path = require("path");

const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" })

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// user signup
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {

        // check email is already registered or not
        const alreadyUser = await Usermodule.findOne({ email: email });
        if (alreadyUser !== null) {
            return res.json({
                status: "failed",
                message: "Already registered"
            })
        }

        // encrypt password
        const hashed = await bcrypt.hash(password, 10);


        // create new user
        const newUser = await Usermodule.create({
            username: username,
            email: email,
            password: hashed
        });

        // generate jwt token
        const token = jwt.sign({ id: newUser._id }, secretKey);

        return res.status(200).json({
            status: "success",
            message: "Signup successfully",
            token: token
        })

    } catch (error) {
        return res.status(409).json({
            status: "failed",
            message: "Something went wrong"
        })
    }
});

// user login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // first check user is exist or not and if exists then take it out
        const alreadyuser = await Usermodule.findOne({ email: email })

        if (alreadyuser === null) {
            res.json({
                status: "faild",
                message: "authentication faild"
            })
        };

        // if user is registered, then check the password

        const confirmPass = await bcrypt.compare(password, alreadyuser.password);
        if (confirmPass === false) {
            res.json({
                status: "faild",
                message: "authentication faild"
            })
        }
        // okay, jswon token

        const token = jwt.sign({ id: alreadyuser._id }, secretKey);

        // return respon
        res.json({
            status: "success",
            message: "logged in successfully",
            token: token
        })

    } catch (error) {

    }
})

// create post
app.post("/post", upload.single('image'), async (req, res) => {

    try {
        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileNmae = req.file.filename + "." + extension;

            // new key in body object
            req.body.image = fileNmae;

            fs.rename(req.file.path, `uploads/${fileNmae}`, () => {
                console.log("\nFile Renamed!\n");
            });
        } else {
            fs.unlink(req.file.path, () => console.log("file deleted"))
            return res.json({
                message: "only images are accepted"
            })
        }
        const newPost = await Post.create(req.body);
        res.status(201).json({
            status: true,
            newPost: newPost,
            message: "post created"
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(200).json({
                status: false,
                errors: errors
            });
        } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// get All post

app.get('/post', async (req, res) => {
    
    try {
        const post = await Post.find({});
        return res.json({
            status: true,
            post:post
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
})

// create category
app.post("/category", upload.single('image'), async (req, res) => {

    try {
        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileNmae = req.file.filename + "." + extension;

            // new key in body object
            req.body.image = fileNmae;

            fs.rename(req.file.path, `uploads/${fileNmae}`, () => {
                console.log("\nFile Renamed!\n");
            });
        } else {
            fs.unlink(req.file.path, () => console.log("file deleted"))
            return res.json({
                message: "only images are accepted"
            })
        }
        const newCategory = await Category.create(req.body);
        res.status(201).json({
            status: true,
            newCategory: newCategory,
            message: "category  are create "
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(200).json({
                status: false,
                errors: errors
            });
        } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// get All category

app.get('/category', async (req, res) => {
    
    try {
        const category = await Category.find({});
        return res.json({
            status: true,
            category:category
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
})

// create comment
app.post("/comment", async (req, res) => {
    const { postid, userid, comment, status } = req.body;
    try {

        // check post id and user id 
        const alreadyUser = await Comment.findOne({ postid: postid }, { userid: userid });
        if (alreadyUser !== null) {
            return res.json({
                status: "failed",
                message: "Already registered"
            })
        }

        // create new comment
        await Comment.create({
            postid: postid,
            userid: userid,
            comment: comment,
            status: status
        });
        // comment responst

        return res.status(200).json({
            status: "success",
            message: "comment created ",
        })

    } catch (error) {
        return res.status(409).json({
            status: "failed",
            message: "Something went wrong"
        })
    }
});

// get All comment
app.get('/comment', async (req, res) => {
    
    try {
        const comment = await Comment.find({});
        return res.json({
            status: true,
            comment:comment
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
})







// server & DB connection
mongoose.connect("mongodb://127.0.0.1:27017/blogs").then(() => {
    app.listen(3001, () => {
        console.log("db connected and server is up now");
    })
})