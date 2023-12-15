import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is not valid"] },
    email: {
      type: String,
      required: [true, "Email is not valid"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is not valid"],
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzwb60tk1/image/upload/v1690028502/Untitled_design_b9xpzs.png",
    },
    password: { type: String, required: [true, "Password is not valid"] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
