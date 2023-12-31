

import express from 'express'

const router=express.Router();

router.get('/auth',async(req,res)=>{
    if ( req.isAuthenticated()) {
        // User is authenticated
        console.log("authenticate");
        return  res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        // User is not authenticated
        console.log("not authenticate");
        return res.status(210).json({ isAuthenticated: true });
    }
})


export default router;
