import { TweetV2SingleStreamResult } from "twitter-api-v2";
import { userClient } from "../clients/user.client";

export async function likeAndReply(
  userId: string,
  tweet: TweetV2SingleStreamResult
): Promise<void> {
  const tweetDetails = {
    tweetId: tweet.data.id,
    tweet: tweet.data.text,
    authorId: tweet.data.author_id,
  };
  console.log(tweetDetails);

  await userClient.v2.like(userId, tweet.data.id);
  // await userClient.v2.reply("Estoy vigilando", tweet.data.id);
  console.log("Tweet likeado! ✅");
}
