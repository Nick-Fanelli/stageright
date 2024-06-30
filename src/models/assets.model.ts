import { ObjectId, Schema } from "mongoose";

export interface IAsset {

    _id?: ObjectId
    name: string

}

const assetsSchema = new Schema<IAsset>({

    name: {
        type: String,
        required: true
    }

})