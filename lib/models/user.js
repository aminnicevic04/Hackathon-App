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
    ukupnaPotrosnja: {
      title: { type: String, default: "Ukupna Potrošnja" },
      value: { type: Number, default: 450 },
    },
    prosecnaPotrosnja: {
      title: { type: String, default: "Prosečna Potrošnja" },
      value: { type: Number, default: 15 },
    },
    co2Potrosnja: {
      title: { type: String, default: "CO2 Emisije" },
      value: { type: Number, default: 22.5 },
    },
    troskoviEnergije: {
      title: { type: String, default: "Troškovi Energije" },
      value: { type: Number, default: 4060 },
    },
    prosecnaPotrosnjaMeseca: {
      label: {
        type: String,
        default: "Prosečna Potrošnja u Poslednjem Mesecu",
      },
      data: {
        domacaPotrosnja: { type: Number, default: 70 },
        poslovnaPotrosnja: { type: Number, default: 30 },
      },
    },
    prosecnaPotrosnjaSatima: {
      label: { type: String, default: "Praćenje Potrošnje Po Satima" },
      data: { type: [Number], default: [80, 90, 120, 100, 110, 130, 140] },
    },
    ukupnaPotrosnjaEnergetskih: {
      label: { type: String, default: "Ukupna Potrošnja Energetskih Uređaja" },
      data: { type: [Number], default: [100, 120, 90, 110, 80, 130] },
    },
    potrosnjaPoKategorijama: {
      label: { type: String, default: "Prikaz Potrošnje Po Kategorijama" },
      data: {
        svetla: { type: Number, default: 30 },
        klimaUredjaji: { type: Number, default: 50 },
        uređajiStandByRežimu: { type: Number, default: 20 },
      },
    },
    notifications: [
      {
        title: { type: String, default: "New Message Received" },
        status: { type: String, default: "unread" },
        date: { type: Date, default: Date.now },
      },
      {
        title: { type: String, default: "Reminder: Upcoming Event" },
        status: { type: String, default: "unread" },
        date: { type: Date, default: Date.now },
      },
      {
        title: { type: String, default: "System Update Notification" },
        status: { type: String, default: "unread" },
        date: { type: Date, default: Date.now },
      },
    ],
    devices: [{ type: mongoose.Types.ObjectId, ref: "Device", default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
