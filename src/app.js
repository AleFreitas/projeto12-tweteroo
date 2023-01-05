import express from 'express';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    // Manda como resposta o texto 'Hello World'
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log("Connected to API")
}) 