import express from "express";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";

const thingsRouter = express.Router();

thingsRouter.get("/", async (req, res) => {
    try {
        const things = await fileDb.getThings();
        res.status(200).send(things);
    } catch (e) {
        res.status(500).send('Error fetching things');
    }
});

thingsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const thing = await fileDb.getThingById(id);
        if (thing) {
            res.status(200).send(thing);
        } else {
            res.status(404).send("Thing not found");
        }
    } catch (e) {
        res.status(500).send('Error fetching thing');
    }
});


thingsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    try {
        const newThing = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            placeId: req.body.placeId,
            description: req.body.description,
            image: req.file ? 'image' + req.file.filename : null,
            date: req.body.date,
        };

        const createdThing = await fileDb.addThing(newThing);

        res.status(200).send(createdThing);
    } catch (e) {
        res.status(500).send('Error adding new thing');
    }
});

thingsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await fileDb.deleteThing(id);
        if (result) {
            res.status(200).send({ message: "Thing deleted" });
        } else {
            res.status(404).send("Thing not found");
        }
    } catch (e) {
        res.status(500).send('Error');
    }
});



export default thingsRouter;
