
import express from 'express';
import message from '../modals/Message.js';
import User from '../modals/User.js';
import { ensureAuth } from '../Midleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/:id/get-message', ensureAuth, async (req, res) => {

    const otherUserGoogleId = req.params.id;//101380260582178444335

    const userMongoDbId = req.user.id;//106809467204521098334

    const userInDb = await User.findOne({ _id: userMongoDbId });
    const userGoogleId = userInDb.googleId;

    console.log(userInDb.googleId, " ", otherUserGoogleId);

    try {

        const chatHistory = await message.find({
            $or: [
                { senderId: userGoogleId, receiverId: otherUserGoogleId },
                { senderId: otherUserGoogleId, receiverId: userGoogleId }
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).json({chatHistory});

    } catch (err) {

        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

})

router.post('/:id/send-message', ensureAuth,async (req, res) => {

    const ReceiverGoogleId = req.params.id;//101380260582178444335
    const userMongoDbId = req.user.id;//106809467204521098334

    const userInDb = await User.findOne({ _id: userMongoDbId });
    const SenderGoogleId = userInDb.googleId;
   console.log(ReceiverGoogleId);
    return res.status(200).json("post is called");

    const { context } = req.body;

    console.log(ReceiverGoogleId, " ", SenderGoogleId, " ", context);



    try {

        const newMessage = new message({
            senderId: SenderGoogleId,
            receiverId: ReceiverGoogleId,
            context: context,
            createAt: new Date()
        });

        await newMessage.save();

        return res.status(201).json({ success: true, message: 'Message sent successfully' });



    } catch (err) {

        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

})



export default router;

