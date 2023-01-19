import * as dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";

dotenv.config();

export const devClient = new TwitterApi(process.env.APP_TOKEN || "");
