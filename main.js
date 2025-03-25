import express from "express";
import https from "https";
const app = express();
import bodyParser from "body-parser";
import OpenAI from "openai";
import "dotenv/config";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function Getai(promptStr) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: promptStr }],
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content
}


app.post("/send", async function(req,res){
    const preambleStr = "Please rewrite the following email to completion so that it sounds like it has been written by someone who works at a big 4 consultancy firm, without using the words consultanty firm or big 4. \n"
    //console.log(preambleStr + req.body.OpenAiInput)
    var htmlData = await Getai(preambleStr + req.body.OpenAiInput)
    res.write("<h1>Here is your email</h1><br>");   
    res.write(htmlData.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    res.write('<br><br><form action="/" method="get"> <input type="submit" value="Submit another the email? "/></form>')
    res.send()  
})


app.listen(3000, function(){
    //console.log("server is runnong on port 3000.")
}
)
