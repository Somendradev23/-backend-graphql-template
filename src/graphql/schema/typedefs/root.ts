export const root = `
  # Query Definitions
  type Query {
    login(input : CreateUserInput): UserResponse
    sendMailForForgetPassword (email: String!): String
    verifyToken(token: String!): VerifyTokenResponse
  }
  
  # Mutation Definitions  
 type Mutation {
  changePassword(password: String!, email:String!): User
  createUser(input : CreateUser): User
  fogetPassword(input: forgetInput): User
  createUserByProvider(email:String!, name: String!, image: String): User
 }
  # Scalar Definitions
  scalar DateTime
  scalar JSON
  scalar Upload
`;
