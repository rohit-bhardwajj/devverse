import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieParser from "cookie-parser";

// import {all} from './routes/blogRoutes'

const app = express()
app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: "16kb" })); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ limit: "16kb" }));

//pls change v1 everywhere i just updated it
app.use('/api/v1/users', authRoutes); // Mount the auth routes
// app.use('/api/v1/snippets', snippetRoutes); // Mount the Snippet route
// app.use('/api/v1/blogs', blogRoutes); // Mount the Blog route


export {app}