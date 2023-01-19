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

    // await devClient.v2.updateStreamRules({
    //   add: [{ value: "#NicoDameUnaExcusa" }],
    // });
    
    const rules = await devClient.v2.streamRules();
    console.log( rules.data);

  const stream = await devClient.v2.searchStream({
    "tweet.fields": ["referenced_tweets", "author_id"],
  });

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    const tweetDetails = {
      tweetId: tweet.data.id,
      tweet: tweet.data.text,
      userId: tweet.data.author_id
    }
    console.log(tweetDetails);

    await userClient.v2.like(userId, tweet.data.id);
    // await userClient.v2.reply("Estoy vigilando", tweet.data.id);
  });
}

async function deleteAllRules() {
  const rules = await devClient.v2.streamRules();

  await devClient.v2.updateStreamRules({
    delete: { ids: rules.data.map((rule) => rule.id) },
  });
}

main();
