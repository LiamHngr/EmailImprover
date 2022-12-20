const express = require("express")
const https = require("https");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
 

app.get("/",function(req,res){
   //res.sendFile("C:/Users/liamh/Documents/OpenAi/emailImprover/index.html")
    res.sendFile(__dirname+"/index.html")
})

async function Getai(promptStr){
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    //console.log(promptStr)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptStr,
        temperature: 0.24,
        max_tokens: 1000,
        /*
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0, 
        stop: ["You:"],*/
    });
    //console.log(response.data.choices[0].text);
    return response.data.choices[0].text  
}

app.post("/send", async function(req,res){
    // console.log(req.body.OpenAiInput);
    //console.log("hello world");
    const preambleStr = "Please rewrite the following email to completion so that it sounds like it has been written by someone who works at a big 4 consultancy firm, without using the words consultanty firm or big 4. \n"
    //console.log(preambleStr + req.body.OpenAiInput)
    var htmlData = await Getai(preambleStr + req.body.OpenAiInput)
    // console.log(htmlData)
    res.write("<h1>Here is your email</h1><br>");   
    res.write(htmlData.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    res.write('<br><br><form action="/" method="get"> <input type="submit" value="Submit another the email? "/></form>')
    res.send()  
})


app.listen(3000, function(){
    console.log("server is runnong on port 3000.")
}
)
