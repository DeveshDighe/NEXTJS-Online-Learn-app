import jwt from 'jsonwebtoken'


const generateToken = async (userId) => {

  // Convert ObjectId to string
  const userIdString = userId.toString();

  // Generate token with the string representation of ObjectId
  const token = jwt.sign({ userId: userIdString }, process.env.SECRET_KEYY);

  return token;
}

const getUserIdFromToken = async (token) => {
  try {
    let tokenDest = token.jwt
      // console.log('Secret key:', process.env.SECRET_KEYY);
      let splicedToken = tokenDest
      const decodedToken = await jwt.verify(splicedToken, process.env.SECRET_KEYY);
      return decodedToken.userId;
  } catch (error) {
      console.error('Error verifying token:', error.message);
      return null;
  }
}


export {
  generateToken,
  getUserIdFromToken
}