import jwt from "jsonwebtoken";
import throwCustomError, { ErrorTypes } from "./errorHandler";
import yenv from "yenv";
// Define a User interface to specify the shape of the user object.
export interface ContextInterface {
  // Define the properties of your user object here.
  // For example:
  oid: string;
  loginId: string;
  email: string;
  iat: number;
  exp: number;
}
const env = yenv("env.yaml", { env: "development" });
const getUser = async (token: string): Promise<ContextInterface | null> => {
  try {
    if (token) {
      const user = jwt.verify(token,
         env.JWT_SECRET) as ContextInterface; // Assuming the payload matches the User interface
      
      return user;
    }

    return null;
  } catch (error) {

    return null;
  }
};

const context = async ({ req, res }: { req: any; res: any }): Promise<any> => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }

  // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
  if (
    req.body.operationName === "CreateUser" ||
    req.body.operationName === "Login" ||
    req.body.operationName === "VerifyToken"
  ) {
    return {};
  }

  // get the user token from the headers
  const token = req.headers.authorization || "";
  // try to retrieve a user with the token
  const user = await getUser(token);

  if (!user) {
    throwCustomError("User is not Authenticated", ErrorTypes.UNAUTHENTICATED);
  }

  // add the user to the context
  return { user };
};

export default context;
