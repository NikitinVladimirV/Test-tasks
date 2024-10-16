import "dotenv/config";

export const configFTP = {
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_USER,
  password: process.env.SERVER_PASSWORD,
  parallel: 5,
};
