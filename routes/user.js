const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("./signin",(req,res)=>{
  return res.render("signin");
});
router.get("./signup",(req,res)=>{
  return res.render("signup");
});

// ✅ Correct route definitions
router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

// ✅ POST: sign in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try{
  const token = await User.matchPasswordAndGenerateToken(email, password);

  return res.cookie('token',token).redirect("/");
  } catch(error) {
    return res.render("signin",{
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/");
})

// ✅ POST: sign up
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body; // fixed: added `password`
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});


module.exports = router;