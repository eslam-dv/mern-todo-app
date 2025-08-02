import { Schema, model, Document } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { ITask } from "./task.model";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  tasks: ITask[];
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "task", default: [] }],
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    ret._id = undefined;
    (ret.__v as any) = undefined;
    (ret.password as any) = undefined;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await compareValue(password, this.password);
};

const UserModel = model<IUser>("user", userSchema);

export default UserModel;
