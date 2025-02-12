import { ObjectId, Schema } from "mongoose";

export interface IAsset {

    _id?: ObjectId
    name: string
    uuid: string,
    location?: ObjectId
    category?: string[]

}

export const assetsSchema = new Schema<IAsset>({

    name: {
        type: String,
        required: true
    },

    uuid: {
        type: String,
        required: true,
        unique: true
    },

    location: {
        type: Schema.Types.ObjectId,
        required: false,
    },

    category: {
        type: [String],
        required: false
    }

});