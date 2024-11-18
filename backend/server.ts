import path from "path";
import express, { Express, json } from "express";
import cors from "cors";
import { WeatherResponse } from "@full-stack/types";
import fetch from "node-fetch";
import { db } from "./firebase";

const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

const userCollectionRef = db.collection("Posts");

app.post("/Post", async (req, res) => {
    const {text} = req.body;
    addPerson(text);
    res.status(200).send("Working");
})

export const getPosts = async () => {
    const snapshot = await userCollectionRef.get();
    const posts = snapshot.docs.map((doc) => doc.data());
    return posts;
  };

app.get("/Post/get", async (req, res) => {
    const posts = await getPosts();
    res.status(200).send({
        message: `SUCCESS retrieved ${posts} from Posts collection`,
        data: posts,
    });
})


export const addPerson = async (text: string) => {
    await userCollectionRef.add({text: text});
  };

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
