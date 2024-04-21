import { createUser } from "@/BackendServices/Auth.service";
import { NextResponse } from "next/server";


export async function POST(req) {
  console.log('aya kya yaha');
  const userData =await req.json()
  try {
      const user = await createUser(userData);
      console.log(user , 'useruser');

      if (user.error) {
          return NextResponse.json({ error: user.error } , {status : 400});
      }

      // const jwt = jwtProvider.generateToken(user._id);

      return NextResponse.json({ message: 'Registration success', success : true }, {status : 200});
  } catch (error) {
      return NextResponse.json({ error: error.message }, {status : 500});
  }
};