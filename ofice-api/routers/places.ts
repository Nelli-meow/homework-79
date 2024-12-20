import express from "express";
import fileDb from "../fileDb";

const placesRouter = express.Router();


placesRouter.get("/", async (req, res) => {
    try {
        const places = await fileDb.getPlaces();
        res.status(200).send(places);
    } catch (e) {
        res.status(500).send('Error places');
    }
});

placesRouter.post("/", async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
         res.status(400).send('Name and description are required');
    }
    try {
        const newPlace = await fileDb.addPlace({ name, description });
        res.status(200).send(newPlace);
    } catch (e) {
        res.status(500).send('Error adding place');
    }
});

export default placesRouter;
