


export const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("user id not login");
    return res.status(200).redirect("/auth/google");
  };

  
