import jwt, { JwtPayload } from "jsonwebtoken";
import yenv from "yenv";
import {
  INVALID_OR_EXPIRED_TOKEN,
  TOKEN_MISSING,
} from "../../utility/variable";
const env = yenv("env.yaml", { env: "development" });
const integrationToken = env.JWT_SECRET;

export const verifyToken = async (_: any, { token }: { token: string }) => {
  if (token) {
    try {
      // Verify the token using the secret key
      const decodedToken = (await jwt.verify(
        token,
        integrationToken
      )) as JwtPayload;
      if (decodedToken) {
        return decodedToken;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(INVALID_OR_EXPIRED_TOKEN);
    }
  } else {
    throw new Error(TOKEN_MISSING);
  }
};
