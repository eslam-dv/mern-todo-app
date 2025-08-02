const getenv = (value: string, defaultVal?: string) => {
  const val = process.env[value] || defaultVal;
  if (!val) {
    throw new Error(`"${value}" is not an environment variable`);
  }
  return val;
};

export const MONGO_URI = getenv("MONGO_URI");
export const PORT = getenv("PORT", "3001");
export const JWT_SECRET = getenv("JWT_SECRET");
export const NODE_ENV = getenv("NODE_ENV");
export const APP_ORIGIN = getenv("APP_ORIGIN");
