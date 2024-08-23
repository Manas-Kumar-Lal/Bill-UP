const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
// const cloudinary = require('cloudinary');
// const fileUpload = require('express-fileupload')
// const passport = require("passport");
// const cookieSession = require("cookie-session");
require("./config/passport.js");

const corsOptions = {
    origin: ['https://school4u.in', 'http://localhost:5173'],
    credentials: true,
    exposedHeaders: ["Set-Cookie"]
};
app.use(cookieParser());
// app.enable('trust proxy')
// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["myultrasecret"],
//         maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
//         secure: true,
//         sameSite: 'none',
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json({ limit: '2mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
app.use(cors(corsOptions));
// app.use(fileUpload());

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// routes import***********
const productRoute = require('./routes/product.route.js')

app.use('/api/v1', productRoute)
app.use(express.urlencoded({ extended: true }))

// middleware imports*******
const errorMiddleware = require('./middlewares/error.middleware.js')
app.use(errorMiddleware);

module.exports = app;