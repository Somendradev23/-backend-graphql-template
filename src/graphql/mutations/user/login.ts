import Users from "../../../database/model/user";
import { CreateUserInput } from "../../../types/user";
import { generateHash } from "../../utility/commonMethod";

export const createUser = async (_: any, input: { input: CreateUserInput }) => {
  try {
    const { email, password, ...rest } = input?.input;
    const hashedPassword = await generateHash(password);
    const checkEmail = await checkEmailDuplication(email);
    if (checkEmail.emailIsDuplicated) {
      throw new Error(checkEmail.errorMessage);
    }

    return await Users.create({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      ...rest,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export interface UserInterface {
  email: string;
  name: string;
  image: string;
}
export const createUserByProvider = async (
  _: any,
  { email, name, image }: UserInterface // Use UserInterface instead of any for type checking
) => {
  console.log(email, name, image); // Removed unnecessary string interpolation
  try {
    // Check if user already exists
    const lowercaseLoginName = email?.toLowerCase();
    const findUser: any = await Users.findOne({
      email: lowercaseLoginName,
      isDeleted: false,
    });
    
    if (findUser) {
      return findUser; // Return the found user
    } else {
      // Create a new user
      const createUser = await Users.create({
        email: email.trim().toLowerCase(),
        name: name?.trim(),
        image: image,
      });
      
      // Save the created user
      const result = await createUser.save();

      if (!result) {
        throw new Error("User was not created");
      } else {
        return result; // Return the created user
      }
    }
  } catch (error:any) {
    throw new Error(error.message); // Throw error message
  }
};
interface UserDuplicationResult {
  emailIsDuplicated: boolean;
  errorMessage?: string;
}

export const checkEmailDuplication = async (
  email: string
): Promise<UserDuplicationResult> => {
  let result: UserDuplicationResult = {
    emailIsDuplicated: false,
  };

  // Check email of new user
  const sanitizedEmail = email.trim().toLowerCase();
  const userEmail = await Users.findOne({
    email: sanitizedEmail,
  });

  if (userEmail) {
    result = {
      emailIsDuplicated: true,
      errorMessage: `Email already exists`,
    };
  }

  return result;
};

export const fogetPassword = async (_: any, input: { input: any }) => {
  try {
    const { refressToken: token, password } = input?.input;
    const checkTokenIsValid: any = await Users.findOne({
      refreshToken: token,
      isDeleted: false,
    });
    if (!checkTokenIsValid) {
      throw new Error("token is not valid");
    }
    const currentTime = new Date();
    const refreshTokenTiming = checkTokenIsValid.updatedAt;
    // Calculate the time difference in milliseconds
    const timeDifference = currentTime.getTime() - refreshTokenTiming.getTime();
    // Convert milliseconds to minutes
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);
    // Check if the time difference is greater than 10 minutes
    if (timeDifferenceInMinutes > 10) {
      throw new Error("Token has expired");
    }
    const hashedPassword = await generateHash(password);
    const updateTheUser = await Users.findOneAndUpdate(
      {
        refreshToken: token,
      },
      {
        password: hashedPassword,
      }
    );

    return updateTheUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const changePassword = async (
  _: any,
  { email, password }: { email: string; password: string }
) => {
  const hashedPassword = await generateHash(password);
  const currentTime = new Date(); // Get the current time

  try {
    const changePassword = await Users.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
        lastPasswordChange: currentTime, // Add the timestamp field
      }
    );

    if (!changePassword) {
      throw new Error(`Password is not updated`);
    } else {
      return changePassword;
    }
  } catch (error) {
    throw new Error(`Something went wrong`);
  }
};
