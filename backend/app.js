import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express()
app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: "16kb" })); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ limit: "16kb" }));

//routes import
import userRouter from './routes/user.routes.js'
import blogRouter from './routes/blog.routes.js'
import categoryRouter from './routes/category.routes.js'
app.use('/api/v1/users', userRouter); // Mount the auth routes
// app.use('/api/v1/snippets', snippetRoutes); // Mount the Snippet route
app.use('/api/v1/blogs', blogRouter); // Mount the Blog route
app.use("/api/v1/category",categoryRouter)


export {app}