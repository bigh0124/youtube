import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);
router.get("/login/failed", (req, res, next) => {
  res.status(403).json({
    message: "failure",
  });
});
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      session: req.session,
    });
  } else
    return res.json({
      session: req.sessionID,
      user: req.session.user,
    });
});
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("http://localhost:3000");
  });
});

export default router;
