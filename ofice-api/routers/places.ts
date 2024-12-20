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

placesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const place = await fileDb.getPLaceById(id);
        if (place) {
            res.status(200).send(place);
        } else {
            res.status(404).send("place not found");
        }
    } catch (e) {
        res.status(500).send('Error place');
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

placesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await fileDb.deletePlace(id);
        if (result) {
            res.status(200).send({ message: "place deleted" });
        } else {
            res.status(404).send("place not found");
        }
    } catch (e) {
        res.status(500).send('Error');
    }
});

export default placesRouter;
