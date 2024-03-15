import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
   
    isDeleted: {
      type: Boolean,
      default: false,
    },
   
    role: {
      type: String,
      enum: ["1", "2"], // Possible values for role field // 1 for the admin , 2 for the user
      default: "2",
    },
    image:{
      type: String
    }
   
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", contactSchema);
export default Users;
