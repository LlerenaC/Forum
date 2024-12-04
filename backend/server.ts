import path from "path";
import express, { Express, json } from "express";
import cors from "cors";
import { WeatherResponse } from "@full-stack/types";
import fetch from "node-fetch";
import {
    getPosts,
    addPost,
    deletePost,
} from "./posts.controller";
import {
    getQuestions,
    addQuestion,
    deleteQuestion,
} from "./questions.controller"

const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

app.post("/Post", async (req, res) => {
    const text = req.body.text;
    const uid = req.body.photoURL;
    const userName = req.body.userName;
    addPost(text, uid, userName);
    res.status(200).send("Working");
});

app.get("/Post/get", async (req, res) => {
    const posts = await getPosts();
    res.status(200).send({
        message: `SUCCESS retrieved ${posts} from Posts collection`,
        data: posts,
    });
});

app.delete("/Post/delete/:id", async (req, res) => {
    const id: string = req.params.id;
    try {
        await deletePost(id);
        res.status(200).send({
            message: `SUCCESS deleted post with id: ${id} from the Posts collection`,
        });
    } catch (err) {
        res.status(500).send({
            error: `ERROR: an error occurred in the /Post/delete endpoint: ${err}`,
        });
    }
});

app.post("/Question", async (req, res) => {
    const data = req.body;
    const text = data.text;
    addQuestion(text);
    res.status(200).send("Working");
});

app.get("/Question/get", async (req, res) => {
    const posts = await getQuestions();
    res.status(200).send({
        message: `SUCCESS retrieved ${posts} from Posts collection`,
        data: posts,
    });
});

app.delete("/Question/delete/:id", async (req, res) => {
    const id: string = req.params.id;
    try {
        await deleteQuestion(id);
        res.status(200).send({
            message: `SUCCESS deleted post with id: ${id} from the Posts collection`,
        });
    } catch (err) {
        res.status(500).send({
            error: `ERROR: an error occurred in the /Post/delete endpoint: ${err}`,
        });
    }
});

app.listen(port, hostname,() => {
    console.log("Listening");
});
