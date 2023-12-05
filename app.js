<<<<<<< HEAD
import express from "express"
import cors from "cors"
import "dotenv/config"
import Hello from "./hello.js"
import Lab5 from "./lab5.js"

import CourseRoutes from "./courses/routes.js"
import ModuleRoutes from "./modules/routes.js"

const app = express()

app.use(cors())

app.use(express.json())

const PORT = 4000

Hello(app)
Lab5(app)
CourseRoutes(app)
ModuleRoutes(app)

app.listen(process.env.PORT || PORT)
=======
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import session from "express-session";

import "dotenv/config";

const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"

console.log(`FRONTEND_URL ${FRONTEND_URL}`);
console.log(`DB_CONNECTION_STRING ${CONNECTION_STRING}`);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

mongoose.connect(CONNECTION_STRING, {
  dbName: "kanbas",
});

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);


app.use(session(sessionOptions));

app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);
>>>>>>> 3bc1e2c (server commit)
