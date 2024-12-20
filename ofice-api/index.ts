import express from "express";
import cors from 'cors';
import fileDb from "./fileDb";
import categoriesRouter from "./routers/categories";
import thingsRouter from "./routers/things";


const app = express();
const port =  8000;

app.use(express.json());
app.use(cors());
app.use('/things', thingsRouter);
app.use('/categories', categoriesRouter);

app.use(express.static('public'));

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
