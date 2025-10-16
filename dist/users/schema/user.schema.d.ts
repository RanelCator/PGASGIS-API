import { Document } from 'mongoose';
export declare class User extends Document {
    firstname: string;
    lastname: string;
    middlename: string;
    emailaddress: string;
    DateTimeEntered: string;
    IsPGAS: number;
    pgasID: number;
    IsActive: number;
    UserType: number;
    username: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
