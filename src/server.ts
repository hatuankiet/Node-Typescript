import bodyParser from "body-parser";
import compression from "compression";
import flash from "connect-flash";
import express from "express";
import expressSession from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import redis from "redis";
import { HomeController } from "./controllers/home.controller";
import { CheckoutController } from './controllers/checkout.controller';
import { ConnectDB } from './db/connect';

// let RedisStore = require('connect-redis')(expressSession);
// let redisClient = redis.createClient();

const app = express();

// Config-view
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use(compression());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
// connect to db
ConnectDB.onConnect();
// using Session
app.use(expressSession({
    secret: "userid",
    // tslint:disable-next-line: object-literal-sort-keys
    resave: true,
    cookie: {
        maxAge: 3600
    },
    saveUninitialized: true,
}));
app.use(flash());
// static : thiết lâp path tĩnh css,image,..
app.use(express.static(path.join(__dirname, "./assets")));
app.use(compression());
// Router
// Home
app.get("/", new HomeController().index);
app.post("/login", new HomeController().login);
app.get("/logout", new HomeController().logOut);
app.post("/buy", new HomeController().onBuyProduct);
// Checkout
app.get("/checkout", new CheckoutController().checkOut);


app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log("Server started on port 3000");
});
