import express from 'express';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json())

const tweets = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub"
    },
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub"
    }
]

const users = []

app.get("/tweets", (req, res) => {
    // Manda como resposta o texto 'Hello World'
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

app.post("/sign-up", (req,res) => {
    const signUpData = req.body;
    users.push(signUpData);
    res.send("OK");
})

app.post("/tweets", (req,res) => {
    const tweetData = req.body;
    users.forEach(item => {
        if(item.username.includes(tweetData.username)){
            tweets.unshift({...tweetData,avatar:item.avatar})
            console.log(tweets)
            res.send("OK")
        }
    })
    res.send("UNAUTHORIZED")
})

app.listen(PORT, () => {
    console.log("Connected to API")
}) 