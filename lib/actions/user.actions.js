"use server";

import User from "../models/user";
import { connectToDb } from "../mongoose";
import { hashPassword } from "../functions";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  validate,
} from "@/lib/validation";

export async function signup(name, email, username, password) {
  try {
    await connectToDb();

    if (!email || !name || !username || !password) {
      return { message: "Invalid inputs." };
    }

    const isNameValid = validate(name, [VALIDATOR_MINLENGTH(3)]);
    const isEmailValid = validate(email, [VALIDATOR_EMAIL()]);
    const isUsernameValid = validate(username, [VALIDATOR_MINLENGTH(3)]);
    const isPasswordValid = validate(password, [VALIDATOR_MINLENGTH(8)]);

    if (!isEmailValid || !isUsernameValid || !isNameValid || !isPasswordValid) {
      return { message: "Please enter valid credentials." };
    }

    const existingEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ name: name });

    if (existingEmail || existingUsername) {
      return { message: "User already exists. Please try again." };
    }
    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    return { message: "User created." };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser(userId) {
  try {
    await connectToDb();

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return { message: "No user found." };
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}
