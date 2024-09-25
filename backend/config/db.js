import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://surajwalia:surajwalia@cluster0.y7cvz.mongodb.net/"
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error: ", error);
  }
};
  