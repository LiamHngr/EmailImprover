import OpenAI from "openai";
//import dotenv from 'dotenv'
import "dotenv/config";

console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: "Can you pleave give me a small poem about a unicorn" }],
  });

  console.log(completion.choices[0].message.content);
}

main();

