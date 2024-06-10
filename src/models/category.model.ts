import { ObjectId, Schema } from "mongoose";

export interface ICategory {

    _id?: ObjectId
    name: string,
    children?: ICategory[]

}

export const categorySchema = new Schema<ICategory>({

    name: {
        type: String,
        required: true
    },

    children: [
        {
            name: {
                type: String,
                required: true,
            },
            children: []
        }
    ]

});