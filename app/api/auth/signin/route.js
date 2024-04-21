import connectDB from "@/Db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


const { findUserbyEmail } = require("@/BackendServices/Auth.service");
const { generateToken } = require("@/BackendServices/Jwt.service");


export async function POST(req){
    
  try {
    connectDB()
      const { password, email } = await req.json();
      console.log(password, email);

      const user = await findUserbyEmail(email)


      if (!user) {
          return NextResponse.json({ message: 'User not found with email' } , {status : 400})
      }
      const ispassWordValid = await bcrypt.compare(password, user.password)
      if (!ispassWordValid) {
          return NextResponse.json({ message: 'Invalid Password' }, {status : 401})
      }

      const jwt = await generateToken(user._id)

      console.log(jwt, 'jwejejejejejejejejeje');

      return NextResponse.json({ jwt, message: 'login success', success: true , user}, {status : 200})
  } catch (error) {
    console.log('This is error',error);
      return NextResponse.json({ error: error.message }, {status : 500})
  }
}