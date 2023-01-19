import * as dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
dotenv.config();

export const userClient = new TwitterApi({
  appKey: process.env.APP_KEY || "",
  appSecret: process.env.APP_SECRET || "",
  accessToken: process.env.ACCESS_TOKEN || "",
  accessSecret: process.env.ACCESS_SECRET || "",
});
