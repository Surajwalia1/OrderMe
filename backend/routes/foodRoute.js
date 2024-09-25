import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';

const foodRouter = express.Router();

// Image storage engine with a check to ensure 'uploads' folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Ensures that the 'uploads' directory exists
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// API routes
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
