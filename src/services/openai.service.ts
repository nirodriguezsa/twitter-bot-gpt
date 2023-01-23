import { openai } from "../clients/openai.client";

export async function generateAIText(promt: string): Promise<any> {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promt,
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1.0,
      stop: ["Yo:"],
    });

    return completion.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

export async function generateAIImage(imgPrompt: string): Promise<any> {
  try {
    const imgResponse = await openai.createImage({
      prompt: imgPrompt,
      n: 1,
      size: "1024x1024",
    });

    return imgResponse.data.data[0].url;
  } catch (error) {
    console.log(error);
  }
}
