import express from 'express';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const tweets = [];
const users = [];

app.post("/sign-up", (req, res) => {
    const signUpData = req.body;
    //username or avatar doesn't exist
    if (!signUpData.username || !signUpData.avatar) {
        res.status(400).send("Todos os campos são obrigatórios");
    }
    //username or avatar is empty
    if (signUpData.username.length === 0 || signUpData.avatar.length === 0) {
        res.sendStatus(400);
    }
    //username or avatar is not string
    if (typeof signUpData.avatar !== "string" || typeof signUpData.username !== "string") {
        res.sendStatus(400);
    }
    //posting user in server memory
    users.push(signUpData);
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const tweetData = req.body;
    //tweet doesn't exist
    if (!tweetData.tweet || !tweetData.username) {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    //tweet is empty
    if (tweetData.tweet.length === 0) {
        res.sendStatus(400);
    }
    //tweet is not string
    if (typeof tweetData.tweet !== "string") {
        res.sendStatus(400);
    }
    //posting tweet in server memory
    users.forEach(item => {
        if (item.username.includes(tweetData.username)) {
            tweets.unshift({ username: tweetData.username, avatar: item.avatar, tweet: tweetData.tweet});
            res.status(201).send("OK");
        }
    });
    res.status(401).send("UNAUTHORIZED");
});

app.get("/tweets", (req, res) => {
    const answer = [];
    let count = 1;
    for (const i of tweets) {
        if (count > 10) {
            break;
        }
        answer.push(i);
        count++;
    }
    res.send(answer);
});

app.get("/tweets/:USERNAME", (req, res) => {
    const tweetUser = req.params.USERNAME;
    const thisUserTweets = tweets.filter(item => item.username === tweetUser);
    res.send(thisUserTweets).status(200);
})

app.listen(PORT, () => {
    console.log("Connected to API");
});