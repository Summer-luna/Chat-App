const express = require("express");
const authRouter = express.Router();
const signUpService = require("../services/signUpService");
const loginService = require("../services/loginService");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const fs = require("fs");
const { convertBufferToBase64 } = require("../util");

authRouter.post("/signup", upload.single("avatar"), async (req, res) => {
  let formData = {
    ...req.body,
    avatar: null,
  };

  if (req.file) {
    const filepath = "./uploads/" + req.file.filename;
    formData.avatar = fs.readFileSync(filepath);
  }

  try {
    const data = await signUpService.createNewUser(formData);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const data = await loginService.handleLogin(req.body.data);

    let userData = {
      id: data.user_id,
      email: data.user_email,
      displayName: data.user_display_name,
      avatar: data.user_avatar_url,
    };

    if (data.user_avatar_url) {
      userData.avatar = convertBufferToBase64(data.user_avatar_url);
    }

    req.session.user = userData;

    res.json(userData);
  } catch (err) {
    res.json(err);
  }
});

authRouter.get("/checkCredential", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ loggedIn: false });
});

authRouter.post("/updateUser", upload.single("avatar"), async (req, res) => {
  let formData = { ...req.body };

  if (req.file) {
    const filepath = "./uploads/" + req.file.filename;
    formData = {
      ...req.body,
      avatar: fs.readFileSync(filepath),
    };
  }

  if (formData.displayName) {
    await signUpService.updateDisplayName(
      formData.displayName,
      req.session.user.id
    );
    req.session.user.displayName = formData.displayName;
  }

  if (formData.avatar) {
    await signUpService.updateAvatar(formData.avatar, req.session.user.id);
    req.session.user.avatar = convertBufferToBase64(formData.avatar);
  }

  res.json("user updated.");
});

authRouter.get("/deleteUser", async (req, res) => {
  try {
    const data = await signUpService.deleteUser(req.session.user.id);
    res.json("successfully deleted user.");
  } catch (e) {
    res.json(e);
  }
});

authRouter.get("/getName", (req, res) => {
  let data = { displayName: "" };
  if (req.session.user.displayName) {
    data.displayName = req.session.user.displayName;
  }

  res.json(data);
});

module.exports = authRouter;
