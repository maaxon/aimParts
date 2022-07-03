export interface IUser {
    _id:string;
    name:string;
    surname:string;
    email:string;
    password:string;
    role: string;
    address:string
    orders:string
}

export interface IUpdateUserRole {
    id:string
    role:string
}