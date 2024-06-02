import { Document, Model, Schema, model, models } from "mongoose";
import UserModel from "./user.model";

export interface ISpace extends Document {

    name: string,
    owner: Schema.Types.ObjectId

}

const spaceSchema = new Schema<ISpace>({

    name: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    }

}, { timestamps: true });

const SpaceModel: Model<ISpace> = models.space || model<ISpace>("space", spaceSchema);

export default SpaceModel;