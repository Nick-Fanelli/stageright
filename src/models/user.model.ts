import mongoose, { Document, Model, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    email: string
}

const userSchema = new Schema<IUser>({

    email: {
        type: String,
        unique: true,
        required: true
    }

}, { timestamps: true });

const UserModel: Model<IUser> = models.user || model<IUser>("user", userSchema);

export default UserModel;