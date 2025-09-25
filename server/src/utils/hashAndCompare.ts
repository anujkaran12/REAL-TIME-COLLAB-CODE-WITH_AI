import bcrypt from "bcrypt";

export const hashString = async (normalString: string) => {
  const salt = await bcrypt.genSalt(10);
  const newString = await bcrypt.hash(normalString, salt);

  return newString;
};

export const compareHashString = async (normalString: string, hashedString: string) => {
  const result = await bcrypt.compare(normalString, hashedString);
  return result;
};
