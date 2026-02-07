import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate Token
const generateToken = (userId) => {
  return jwt.sign({ id:userId}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
export const register = async (req, res) => {

  try{
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // User Exist
    const userExits = await User.findOne({ email });
    if ( userExits ) {
      return res.status(400).json( {message: 'User exits'});
    }

    // Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })

  } catch (error){

    res.status(500).json({ message: error.message})
  }
};

// Login User
export const login = async (req, res) => {

  try{
    // Get user data
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check User
      const user = await User.findOne({ email: email.toLowerCase(), });
      
    const isMatch = await bcrypt.compare(password, user.password)

      if( !user || !isMatch ){
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    
      // Send response
    res.status(200).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error){
    res.status(500).json({ message: error.message});
  }
}


export const getMe = async (req, res) => {
  res.json(req.user);
};
