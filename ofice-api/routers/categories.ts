import express from "express";
import fileDb from "../fileDb";

const categoriesRouter = express.Router();


categoriesRouter.get("/", async (req, res) => {
    try {
        const categories = await fileDb.getCategories();
        res.status(200).send(categories);
    } catch (e) {
        res.status(500).send('Error categories');
    }
});


categoriesRouter.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
             res.status(400).send('Name and description are required');
             return;
        }

        const newCategory = await fileDb.addCategory({ name, description });
        res.status(200).send(newCategory);
    } catch (e) {
        res.status(500).send('Error adding category');
    }
});

export default categoriesRouter;
