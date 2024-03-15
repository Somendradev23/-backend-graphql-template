import bcrypt from "bcrypt";

export function generateRandomString(strLength: number = 8): string {
  const uppercaseLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters: string = "abcdefghijklmnopqrstuvwxyz";
  const digits: string = "0123456789";
  const specialCharacters: string = "!@#$%^&*";

  const charset: string =
    uppercaseLetters + lowercaseLetters + digits + specialCharacters;
  const charsetLen: number = charset.length;

  // Ensure minimum length of 8 characters
  const length: number = Math.max(strLength, 8);

  let randomStr: string = "";

  // Add at least one uppercase letter
  randomStr += uppercaseLetters.charAt(
    Math.floor(Math.random() * uppercaseLetters.length)
  );

  // Add at least one lowercase letter
  randomStr += lowercaseLetters.charAt(
    Math.floor(Math.random() * lowercaseLetters.length)
  );

  // Add at least one digit
  randomStr += digits.charAt(Math.floor(Math.random() * digits.length));

  // Add at least one special character
  randomStr += specialCharacters.charAt(
    Math.floor(Math.random() * specialCharacters.length)
  );

  // Generate remaining characters randomly
  for (let i = randomStr.length; i < length; i++) {
    randomStr += charset.charAt(Math.floor(Math.random() * charsetLen));
  }

  return randomStr;
}

export async function generateHash(
  password: string,
  saltRounds = 10
): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export const checkPermissions = (
  userPermissions: string[],
  allowedPermissions: string[]
) => {
  return userPermissions?.some((role: string) =>
    allowedPermissions.includes(role)
  );
};

export function generateRandomAlphabetString(length: number) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const alphabetLength = alphabet.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabetLength);
    result += alphabet.charAt(randomIndex);
  }

  return result;
}
