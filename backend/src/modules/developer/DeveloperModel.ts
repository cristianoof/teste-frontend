import mongoose, { Document, Schema } from "mongoose";

export interface IDeveloperModel extends Document {
  id?: string;
  academicBackground: string;
  avatarUrl?: string;
  city: string;
  email: string;
  githubUser?: string;
  githubUserProfileUrl?: string;
  name: string;
  technologies: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperSchema: Schema = new Schema(
  {
    academicBackground: { type: String, required: true },
    avatarUrl: { type: String, required: false },
    city: { type: String, required: true },
    email: { type: String, required: true },
    githubUser: { type: String, required: false },
    githubUserProfileUrl: { type: String, required: false },
    name: { type: String, required: true },
    technologies: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDeveloperModel>("Developer", DeveloperSchema);
