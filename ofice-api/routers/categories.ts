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

categoriesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await fileDb.getCategoryById(id);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(404).send("category not found");
        }
    } catch (e) {
        res.status(500).send('Error category');
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
})

categoriesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await fileDb.deleteCategory(id);
        if (result) {
            res.status(200).send({ message: "category deleted" });
        } else {
            res.status(404).send("category not found");
        }
    } catch (e) {
        res.status(500).send('Error');
    }
});

export default categoriesRouter;
