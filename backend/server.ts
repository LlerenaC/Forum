import path from "path";
import express, { Express, json } from "express";
import cors from "cors";
import { WeatherResponse } from "@full-stack/types";
import fetch from "node-fetch";
import {
    getPosts,
    addPost,
    deletePost,
    getID,
} from "./posts.controller";

const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

app.post("/Post", async (req, res) => {
    const {text} = req.body;
    addPost(text);
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

type WeatherData = {
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    current: {
        time: string;
        interval: number;
        precipitation: number;  
    };
};

app.get("/weather", async (req, res) => {
    console.log("GET /api/weather was called");
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=40.7411&longitude=73.9897&current=precipitation&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York&forecast_days=1"
        );
        const data = (await response.json()) as WeatherData;
        const output: WeatherResponse = {
            raining: data.current.precipitation > 0.5,
        };
        res.json(output);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log("Listening");
});
