import userModel from "../models/usermodel.js";
import { hashPasssword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    //validations
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone is required" });
    }
    if (!address) {
      return res.status(400).send({ error: "Address is required" });
    }
    // check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Regsiter Please Login",
      });
    }
    const hashedPassword = await hashPasssword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
