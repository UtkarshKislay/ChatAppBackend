import express from "express";
import bodyParser from 'body-parser';
import ConnectDB from "./db/dbConnect.js";
import passport from "passport";
import './config/passport.js';
import auth from './routes/auth.js';
import user from './routes/user.js';
import home from './routes/home.js';
import message from './routes/message.js';
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from 'connect-mongo';

import isAuthenticated from './routes/isAuthenticated.js';
import cors from 'cors';

const MongoStore = connectMongo(session);

const app = express();

ConnectDB();
// const corsOption = {
//   origin: ['http://localhost:3000','http://localhost:5000'],
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }
// app.use(cors(corsOption));
// app.use(cors());

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // res.setHeader('Access-Control-Allow-Credentials','true');
  next();
});


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/', home);
app.use('/check',isAuthenticated);
app.use("/auth", auth);
app.use("/user", user);
app.use('/chat',message);

app.use("/*", (req, res) => {
  res.redirect("/");
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})

