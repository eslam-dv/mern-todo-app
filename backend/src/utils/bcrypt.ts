import bcrypt from "bcrypt";

export const hashValue = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(value, salt);

  return hashed;
};

export const compareValue = async (
  enteredValue: string,
  value: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(enteredValue, value);

  return isMatch;
};
