import { ObjectId, Schema } from "mongoose"

export interface ILocation {

    _id?: ObjectId,
    locationName: string

}

export const locationSchema = new Schema<ILocation>({

    locationName: {
        type: String,
        required: true,
    }

});