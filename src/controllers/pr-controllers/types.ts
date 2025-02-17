import mongoose from "mongoose";

export interface PRType extends Document {
 user: mongoose.Schema.Types.ObjectId;
 type: string;
 exercise: string;
 value: string;
 date: Date;
 createdAt: Date;
 updatedAt: Date;
}
