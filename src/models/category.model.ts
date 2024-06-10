import { ObjectId, Schema } from "mongoose";

export interface ICategory {

    _id?: ObjectId
    name: string,
    children?: ICategory[]

}

const categorySchema = new Schema<ICategory>({

    name: {
        type: String,
        required: true
    },

});

categorySchema.add({
    children: [categorySchema]
});

export { categorySchema };