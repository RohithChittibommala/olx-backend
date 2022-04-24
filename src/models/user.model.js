import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "listing" }],
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "listing" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await this.encryptPassword(this.password);
  }
  next();
});

userSchema.methods.encryptPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  console.log(this);

  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

export default User;
