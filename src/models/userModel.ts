import { Schema, model, models } from "mongoose";

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    }

}, { timestamps: true });

const UserModel = models.user || model('user', userSchema);

export default UserModel;