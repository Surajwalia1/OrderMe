// server.js

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // Make sure the path is correct
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';


// App config
const app = express();
const port = 4000;

// Middleware 
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

//Api endpoint 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
