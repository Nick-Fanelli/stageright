import { Document, Model, Schema, model, models } from "mongoose";
import UserModel from "./user.model";
import { ILocation, locationSchema } from "./location.model";
import { ICategory, categorySchema } from './category.model';
import { IAccess, accessSchema } from "./access.model";

export interface ISpace extends Document {

    name: string,
    owner: Schema.Types.ObjectId,
    locations: ILocation[],
    categories: ICategory[],
    access: IAccess[]

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
    },

    locations: {
        type: [locationSchema],
        required: true,
    },

    categories: {
        type: [categorySchema],
        required: true,
    },

    access: {
        type: [accessSchema],
        required: true,
    }

}, { timestamps: true });

const SpaceModel: Model<ISpace> = models.space || model<ISpace>("space", spaceSchema);

export default SpaceModel;