import express from 'express';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json())

const tweets = []
const users = []

app.post("/sign-up", (req, res) => {
    const signUpData = req.body;
    const signUpKeys = Object.keys(signUpData);
    //username or avatar doesn't exist
    if((signUpKeys.indexOf("username") === (-1)) || (signUpKeys.indexOf("avatar") === (-1))){
        res.sendStatus(400)
    }
    //username or avatar empty
    if(signUpData.username.length === 0 || signUpData.avatar.length === 0){
        res.sendStatus(400)
    }
    //username or avatar is not string
    if(typeof signUpData.avatar === "string" || typeof signUpData.username === "string"){
        res.sendStatus(400)
    }
    users.push(signUpData);
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    const tweetData = req.body;
    users.forEach(item => {
        if (item.username.includes(tweetData.username)) {
            tweets.unshift({ ...tweetData, avatar: item.avatar })
            console.log(tweets)
            res.send("OK")
        }
    })
    res.send("UNAUTHORIZED")
})

app.get("/tweets", (req, res) => {
    const answer = [];
    let count = 1;
    for (let i = 0; i < tweets.length; i++) {
        if (count > 10) {
            break;
        }
        answer.push(tweets[i]);
        count++;
    }
    res.send(answer);
});

app.listen(PORT, () => {
    console.log("Connected to API")
}) 