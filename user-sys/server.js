const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const postModel = require("./models/post.model");
const userModel = require("./models/user.model");
const path = require("path");
const upload = require("./config/multer");





//image folder --> image --> aa.jpg (laptop)
//my pic folder --> image --> aa.jpg (mobile)


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

// frontend logic
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/profile", auth, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate('posts');


 
  
  res.render("profile", { user });
});

app.get("/post", auth, (req, res) => {
  res.render("post");
});

// backend + database logic
// signup user ==> create a new user
app.post("/create", (req, res) => {
  let { fullname, username, email, phone, password, image } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    try {
      await userModel.create({
        fullname,
        username,
        email,
        phone,
        password: hash,
        image,
      });
    } catch (err) {
      res.send(err);
    }
  });
  res.redirect("/");
});

// login user ==> check email and password, redirect to profile page
app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.send("Something went Wrong - Email");
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email: user.email }, "aabbcc");

        res.cookie("token", token);
        res.redirect("/profile");
      } else {
        res.send("Something went wrong");
      }
    });
  }

  userModel.findOne({ email: req.body.email });
});

// logout user ==> remove token from cookie
app.get("/logout", (req, res) => {
  res.clearCookie();
  res.redirect("/");
});

// create post with error handling
app.post("/post", auth, upload.single('imgurl'), async (req, res) => {
  try {
    console.log('Creating post for user:', req.user.email);
    console.log('Post data:', req.body);
    
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      console.log('User not found');
      return res.status(404).send("User not found");
    }

    let { title, description } = req.body;

    console.log(req.fle);
    

    let createdPost = await postModel.create({
      userId: user._id,
      title,
      description,
      imgurl: req.file.filename,
    });
    console.log('Post created:', createdPost._id);

    user.posts.push(createdPost._id);
    await user.save();
    console.log('User posts updated');

    res.redirect("/profile");
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(500).send('Error creating post: ' + error.message);
  }
});

app.post("/updateprofile", auth, upload.single('image'), async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let { fullname, username, phone, email: newEmail } = req.body;
    if (fullname) user.fullname = fullname;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (newEmail && newEmail !== user.email) user.email = newEmail;
    if (req.file) user.image = req.file.filename;
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).send("Update failed: " + error.message);
  }
});

app.get("/editprofile", auth, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate('posts');
  res.render("editprofile", { user });
});
// Middleware Functions
function auth(req, res, next) {
  // console.log(req.cookies)
  let token = req.cookies.token;

  if (!token) {
    res.send("Access Denied !!");
  }

  try {
    let verified = jwt.verify(token, "aabbcc");
    req.user = verified; // this data send into route(check profile route, yoou can access email like req.user.email)

    next();
  } catch (error) {
    console.log("Invalid Token");
  }
}

app.listen(3000, () => {
  console.log("server is running ✔");
});
