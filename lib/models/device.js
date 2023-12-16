import mongoose, { Schema } from "mongoose";

const DeviceSchema = new Schema(
  {
    naziv_uredjaja: { type: String, unique: false },
    model_uredjaja: {
      type: String,
      unique: false,
    },
    potrosnja_energije: {
      type: String,
      unique: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Device = mongoose.models.Device || mongoose.model("Device", DeviceSchema);

export default Device;
