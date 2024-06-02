import { Document, Model, Schema, model, models } from "mongoose";
import UserModel from "./user.model";

export interface IOrganization extends Document {

    name: string,
    owner: Schema.Types.ObjectId

}

const organizationSchema = new Schema<IOrganization>({

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

const OrganizationModel: Model<IOrganization> = models.organization || model<IOrganization>("organization", organizationSchema);

export default OrganizationModel;