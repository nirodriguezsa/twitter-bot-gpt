import { TweetV2SingleStreamResult } from "twitter-api-v2";
import { userClient } from "../clients/user.client";
import { Constants } from "../constants/constants";
import { generateAIText } from "../services/openai.service";

export async function likeAndReply(
  userId: string,
  tweetDetails: TweetV2SingleStreamResult
): Promise<void> {
  const tweet = tweetDetails.data.text;
  // Ignore retweets and also tweets from the same bot
  const is_a_RT =
    tweetDetails.data.referenced_tweets?.some(
      (tweet) => tweet.type === "retweeted"
    ) ?? false;
  if (is_a_RT || tweetDetails.data.author_id === userId) {
    return;
  }

  console.log("☢︎ ", tweet);
  //Clear text in tweet (delete rule text)
  const clear_text = tweetDetails.data.text.replace(Constants.rule, "");
  const oneShotPrompt = Constants.translatePrompt + clear_text;
  const rawResponse = await generateAIText(oneShotPrompt);
  const response = rawResponse?.split("Twitter bot: ")[1];
  await userClient.v2.like(userId, tweetDetails.data.id);
  console.log("Tweet likeado! ✓");

  await userClient.v2.reply(response, tweetDetails.data.id);
  console.log({ response });
  console.log("Tweet respondido! ✓");
}
