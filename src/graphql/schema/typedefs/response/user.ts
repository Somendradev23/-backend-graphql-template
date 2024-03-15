export const userResponse = `
type User {
    id: String!
    email: String!
    password: String
    isDeleted:Boolean
    name: String,
    role: String
}
type UserResponse {
    id: String!
    email: String!
    password: String
    isDeleted:Boolean
    name: String
    role: String
    token:String
}
type VerifyTokenResponse{
    oid: String
    loginId: String
    email: String
    iat: String
    exp: String
}
type updatePasswordResponse{
    affected: Int 
}
`;
