import * as dotenv from "dotenv";
import { devClient } from "./clients/dev.client";
import { userClient } from "./clients/user.client";
import { ETwitterStreamEvent } from "twitter-api-v2";
import { welcome } from "../welcome";

dotenv.config();
welcome();

async function main(): Promise<void> {
  const user = await userClient.v2.me();
  const userId = user.data.id;
  console.log({ userId });

  await devClient.v2.updateStreamRules({
    add: [{ value: "NicolasRS" }],
  });

  const rules = await devClient.v2.streamRules();
  console.log({ rules });

  const stream = await devClient.v2.searchStream({
    "tweet.fields": ["referenced_tweets", "author_id"],
  });

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    console.log(tweet.data.text);
    console.log(tweet.data.author_id);

    await userClient.v2.like(userId, tweet.data.id);
    // await userClient.v2.reply("Ojito con eso manito", tweet.data.id);
  });
}

main();
