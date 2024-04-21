import mongoose from "mongoose";

// const URI = 

const connectDB = async () => {

  await mongoose.connect(process.env.MONGO_URL);
  console.log('DB Connected...');
}

export default connectDB