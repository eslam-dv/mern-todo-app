import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  userId: string;
  title: string;
  isDone: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    userId: { type: String, required: true, ref: "user" },
    title: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { timestamps: true },
);

taskSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    (ret.__v as any) = undefined;
    (ret._id as any) = undefined;
  },
});

const TaskModel = model<ITask>("task", taskSchema);
export default TaskModel;
