import { ObjectId, Schema } from "mongoose";

export interface IItem {

    _id?: ObjectId
    name: String,
    sku: String,
    quantity: number,
    location?: ObjectId

}

export const itemsSchema = new Schema<IItem>({
    
    name: {
        type: String,
        required: true,
    },

    sku: {
        type: String,
        required: true,
        unique: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    location: {
        type: Schema.Types.ObjectId,
        required: false
    }

});