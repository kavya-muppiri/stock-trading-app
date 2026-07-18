import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    virtualBalance: {
      type: Number,
      default: 100000,
      min: 0,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    watchlist: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
