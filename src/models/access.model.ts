import { ObjectId, Schema } from "mongoose";

export type AccessLevel = "admin" | "editor" | "viewer";

export interface IAccess {

    _id?: ObjectId,
    email: string,
    accessLevel: AccessLevel

}

export const accessSchema = new Schema<IAccess>({

    email: {
        type: String,
        required: true
    },

    accessLevel: {
        type: String,
        enum: [ "admin", "editor", "viewer" ],
        required: true
    }

})