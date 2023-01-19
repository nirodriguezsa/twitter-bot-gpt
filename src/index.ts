import * as dotenv from "dotenv";
import { devClient } from "./clients/dev.client";
import { userClient } from "./clients/user.client";
import { ETwitterStreamEvent } from "twitter-api-v2";
import { welcome } from "../welcome";
import { createStreamRules, getAllRules } from "./services/service";
import { likeAndReply } from "./actions/actions";

dotenv.config();
welcome();

async function main(): Promise<void> {
  const user = await userClient.v2.me();
  const userId = user.data.id;

  await createStreamRules(["#NicoExcuseme"]);
  console.log(await getAllRules());

  const stream = await devClient.v2.searchStream({
    "tweet.fields": ["referenced_tweets", "author_id"],
  });

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    await likeAndReply(userId, tweet);
  });
}

main();
