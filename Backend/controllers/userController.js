import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  const secret = process.env.JWT_SECRET || "random#secret";
  return jwt.sign({ id }, secret);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne(email);

    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user.id);
    return res.json({ success: true, token, name: user.name });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email || "")) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }

    if (!password || password.length < 8) {
      return res.json({ success: false, message: "Please Strong Password" });
    }

    const exists = await userModel.findOne(email);
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create(name, email, hashedPassword);

    const token = createToken(user.id);
    return res.json({ success: true, token, name: user.name });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
