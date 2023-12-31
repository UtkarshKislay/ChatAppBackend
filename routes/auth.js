import express from "express";

import passport from "passport";

const router=express.Router();

router.get("/google",

    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  
  router.get("/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
    }),
    (req, res) => {
      console.log("hwer we geotnwto");
      res.redirect("/");
      // return res.status(200).json("Authenticated");
    }
  );
  
  router.get("/logout", (req, res) => {
    req.logOut(() => {
      // res.redirect("/");
      return res.status(200).json("Logout");
    });
  });

  export default router;