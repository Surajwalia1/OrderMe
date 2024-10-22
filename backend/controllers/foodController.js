import foodModel from "../models/foodModel.js"; 
import fs from 'fs';
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

const addFood = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { name, description, price, category } = req.body;

  // Validate the required fields
  if (!name || !description || !price || !category) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  let image_filename = req.file ? req.file.filename : null;

  if (!image_filename) {
    return res.status(400).json({ success: false, message: "Image is required" });
  }

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};



// list food 
const listFood = async(req,res) =>{
  try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods}) 
  } catch(error){
     console.log(error);
     res.json({success:false,message:"Error"})
  }

}



//remove food 

const removeFood = async(req,res)=>{
    try {
      const food  = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`,()=>{})

      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true,message:"Food Removed" })
      
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error" })
      
    }
}

export { addFood,listFood,removeFood };
